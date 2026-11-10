-- Operace PF 2027 / Vánoční běh. Spusťte celý soubor v Supabase SQL Editoru.
-- Přidává jen tabulky a funkce pf2027_*. Žádná data nemaže.
begin;
create table if not exists public.pf2027_runner_sessions (
 id uuid primary key, client_hash text not null, ip_hash text not null,
 created_at timestamptz not null default now(), used boolean not null default false
);
create index if not exists pf2027_client_rate on public.pf2027_runner_sessions(client_hash,created_at);
create index if not exists pf2027_ip_rate on public.pf2027_runner_sessions(ip_hash,created_at);
create table if not exists public.pf2027_runner_scores (
 id uuid primary key default gen_random_uuid(),
 session_id uuid unique not null references public.pf2027_runner_sessions(id),
 nickname text not null check(char_length(nickname) between 2 and 32),
 score integer not null check(score between 0 and 150000),
 distance double precision not null check(distance>=0 and distance<=4500000),
 saved integer not null check(saved between 0 and 6000),
 created_at timestamptz not null default now(),
 check(score=floor(distance/30)::integer+saved*25)
);
create index if not exists pf2027_ranking on public.pf2027_runner_scores(score desc,created_at);
alter table public.pf2027_runner_sessions enable row level security;
alter table public.pf2027_runner_scores enable row level security;
revoke all on public.pf2027_runner_sessions,public.pf2027_runner_scores from public,anon,authenticated;
grant all on public.pf2027_runner_sessions,public.pf2027_runner_scores to service_role;
create or replace function public.pf2027_start_run(p_id uuid,p_client text,p_ip text)
returns boolean language plpgsql security invoker set search_path='' as $$
begin
 -- Browser and IP locks keep limits valid even for concurrent requests.
 perform pg_advisory_xact_lock(hashtextextended('client:'||p_client,0));
 perform pg_advisory_xact_lock(hashtextextended('ip:'||p_ip,0));
 if (select count(*) from public.pf2027_runner_sessions where client_hash=p_client and created_at>now()-interval '1 minute')>=20
 or (select count(*) from public.pf2027_runner_sessions where ip_hash=p_ip and created_at>now()-interval '1 minute')>=600 then return false;end if;
 insert into public.pf2027_runner_sessions(id,client_hash,ip_hash) values(p_id,p_client,p_ip);return true;
end;$$;
create or replace function public.pf2027_save_run(p_session uuid,p_client text,p_nickname text,p_score integer,p_distance double precision,p_saved integer)
returns uuid language plpgsql security invoker set search_path='' as $$
declare s public.pf2027_runner_sessions;r public.pf2027_runner_scores;sid uuid;elapsed double precision;
begin
 select * into s from public.pf2027_runner_sessions where id=p_session for update;
 if s.id is null or s.client_hash<>p_client or s.created_at<now()-interval '2 hours' then raise exception 'run_invalid';end if;
 -- A retry after a lost HTTP response returns the existing result, never a duplicate.
 if s.used then
  select * into r from public.pf2027_runner_scores where session_id=p_session;
  if r.nickname=p_nickname and r.score=p_score and r.distance=p_distance and r.saved=p_saved then return r.id;end if;
  raise exception 'run_already_used';
 end if;
 elapsed=extract(epoch from (clock_timestamp()-s.created_at));
 if p_nickname is null or p_nickname<>btrim(p_nickname) or char_length(p_nickname) not between 2 and 32 or p_nickname ~ '[[:cntrl:]<>"&]'
 or p_score is null or p_score<0 or p_score>150000 or p_distance is null or not(p_distance>=0 and p_distance<=4500000) or p_saved is null or p_saved<0 or p_saved>6000
 or p_distance>elapsed*580+30 or p_saved>floor(elapsed/1.8)+1 or p_score<>floor(p_distance/30)::integer+p_saved*25 then raise exception 'score_invalid';end if;
 insert into public.pf2027_runner_scores(session_id,nickname,score,distance,saved) values(p_session,p_nickname,p_score,p_distance,p_saved) returning id into sid;
 update public.pf2027_runner_sessions set used=true where id=p_session;return sid;
end;$$;
create or replace function public.pf2027_top_runs()
returns table(id uuid,nickname text,score integer,created_at timestamptz)
language sql stable security invoker set search_path='' as $$
 select t.id,t.nickname,t.score,t.created_at from (
 select distinct on (lower(s.nickname)) s.id,s.nickname,s.score,s.created_at
 from public.pf2027_runner_scores s order by lower(s.nickname),s.score desc,s.created_at,s.id
 ) t order by t.score desc,t.created_at,t.id limit 10;
$$;
revoke all on function public.pf2027_start_run(uuid,text,text) from public,anon,authenticated;
revoke all on function public.pf2027_save_run(uuid,text,text,integer,double precision,integer) from public,anon,authenticated;
revoke all on function public.pf2027_top_runs() from public,anon,authenticated;
grant execute on function public.pf2027_start_run(uuid,text,text),public.pf2027_save_run(uuid,text,text,integer,double precision,integer),public.pf2027_top_runs() to service_role;
commit;
