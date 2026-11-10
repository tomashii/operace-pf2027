import {createHmac,randomUUID,timingSafeEqual} from 'node:crypto';
export const error=(message,status=400)=>Object.assign(new Error(message),{status});
export function env(){
 const {SUPABASE_URL,SUPABASE_SECRET_KEY,APP_ORIGIN}=process.env;
 if(!SUPABASE_URL||!SUPABASE_SECRET_KEY||!APP_ORIGIN)throw error('Žebříček není nastavený. Doplňte tři proměnné ve Vercelu.',503);
 let url,origin;try{url=new URL(SUPABASE_URL);origin=new URL(APP_ORIGIN)}catch{throw error('Zkontrolujte adresy SUPABASE_URL a APP_ORIGIN ve Vercelu.',503)}
 if(url.protocol!=='https:'||origin.protocol!=='https:'||origin.origin!==APP_ORIGIN||url.pathname!=='/'||url.search||url.hash||!SUPABASE_SECRET_KEY.startsWith('sb_secret_'))throw error('Zkontrolujte SUPABASE_URL, serverový klíč sb_secret_… a APP_ORIGIN bez koncového lomítka.',503);
 return {url:url.origin,key:SUPABASE_SECRET_KEY,origin:origin.origin,secret:createHmac('sha256',SUPABASE_SECRET_KEY).update('respect-pf2027-run-signing-v1').digest('hex')};
}
export function sign(payload,secret){const b=Buffer.from(JSON.stringify(payload)).toString('base64url');return b+'.'+createHmac('sha256',secret).update(b).digest('base64url')}
export function verify(token,secret,now=Date.now()){
 if(typeof token!=='string'||token.length>1500)throw error('Neplatný herní pokus.');const [b,s,...extra]=token.split('.');if(!b||!s||extra.length)throw error('Neplatný herní pokus.');
 const expected=createHmac('sha256',secret).update(b).digest('base64url');if(s.length!==expected.length||!timingSafeEqual(Buffer.from(s),Buffer.from(expected)))throw error('Neplatný herní pokus.');
 let data;try{data=JSON.parse(Buffer.from(b,'base64url').toString())}catch{throw error('Neplatný herní pokus.')}
 if(!/^[0-9a-f-]{36}$/i.test(data.id)||!Number.isSafeInteger(data.at)||data.at>now||now-data.at>7200000||typeof data.client!=='string')throw error('Herní pokus je neplatný nebo vypršel.');return data;
}
export function client(req,res,secret){
 const current=String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('pf2027_client='))?.split('=')[1];
 const id=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(current||'')?current:randomUUID();
 if(id!==current)res.setHeader('Set-Cookie','pf2027_client='+id+'; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax');
 const digest=value=>createHmac('sha256',secret).update(value).digest('hex');
 return {browser:digest('browser:'+id),ip:digest('ip:'+String(req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim())};
}
export function gate(req,res,method){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!==method){res.setHeader('Allow',method);throw error('Metoda není povolena.',405)}
 if(method==='POST'){
  const e=env();if(req.headers.origin!==e.origin)throw error('Nepovolená adresa webu. Zkontrolujte APP_ORIGIN ve Vercelu.',403);
  if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))throw error('Je potřeba JSON.',415);
  if(Number(req.headers['content-length']||0)>4096||JSON.stringify(req.body||{}).length>4096)throw error('Požadavek je příliš velký.',413);
  if(!req.body||typeof req.body!=='object'||Array.isArray(req.body))throw error('Neplatný požadavek.');
 }
}
export function validateScore(body,session,now=Date.now()){
 const {nickname,score,metadata}=body||{};
 if(typeof nickname!=='string'||nickname!==nickname.trim()||!/^[\p{L}\p{N} ._-]{2,32}$/u.test(nickname))throw error('Přezdívka musí mít 2–32 písmen, číslic, mezer, teček nebo pomlček.');
 if(!Number.isSafeInteger(score)||score<0||score>150000)throw error('Neplatné skóre.');
 const {distance,saved}=metadata||{},elapsed=(now-session.at)/1000;
 if(!Number.isFinite(distance)||distance<0||distance>4500000||!Number.isSafeInteger(saved)||saved<0||saved>6000||distance>elapsed*580+30||saved>Math.floor(elapsed/1.8)+1||score!==Math.floor(distance/30)+saved*25)throw error('Skóre neodpovídá průběhu hry.');
 return {nickname,score,distance,saved};
}
export async function db(path,body){
 const e=env();let response;try{response=await fetch(e.url+'/rest/v1/'+path,{method:'POST',headers:{apikey:e.key,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)})}catch{throw error('Databáze neodpovídá. Zkus to za chvíli.',503)}
 let data;try{data=await response.json()}catch{throw error('Neplatná odpověď databáze.',503)}
 if(!response.ok){const code=data?.message;if(code==='run_already_used')throw error('Tento pokus už byl uložen.',409);if(code==='run_invalid')throw error('Herní pokus vypršel. Zahraj novou hru.',409);if(code==='score_invalid')throw error('Skóre neodpovídá průběhu hry.');throw error('Databáze není připravená. Zkontrolujte SQL soubor a klíč Supabase.',503)}return data;
}
export function fail(res,e){res.status(e.status||500).json({error:e.status?e.message:'Výsledek teď nelze zpracovat. Zkus to za chvíli.'})}
