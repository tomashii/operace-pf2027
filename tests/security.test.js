import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {env,sign,verify,validateScore,db} from '../server/core.js';
import session from '../api/session.js';
import score from '../api/score.js';
import status from '../api/status.js';
process.env.SUPABASE_URL='https://example.supabase.co';
process.env.SUPABASE_SECRET_KEY='sb_secret_TEST_ONLY';
process.env.APP_ORIGIN='https://operace-vanoc.vercel.app';
const response=()=>({headers:{},code:0,body:null,setHeader(k,v){this.headers[k]=v},status(c){this.code=c;return this},json(b){this.body=b;return this}});
const request=(body={},extra={})=>({method:'POST',headers:{origin:process.env.APP_ORIGIN,'content-type':'application/json'},body,...extra});
test('signed attempts reject tampering and expired tokens',()=>{const s={id:randomUUID(),at:Date.now(),client:'test'};const token=sign(s,'key');assert.deepEqual(verify(token,'key'),s);assert.throws(()=>verify(token,'other'));assert.throws(()=>verify(token,'key',s.at+7200001));});
test('score formula, elapsed time and nickname are checked',()=>{const s={at:Date.now()-10000};assert.equal(validateScore({nickname:'Čenda',score:55,metadata:{distance:900,saved:1}},s).score,55);for(const body of [{nickname:'<script>',score:0,metadata:{distance:0,saved:0}},{nickname:'Honza',score:9999,metadata:{distance:0,saved:0}},{nickname:'Honza',score:10000,metadata:{distance:300000,saved:0}}])assert.throws(()=>validateScore(body,s));});
test('API requires origin, binds cookie and uses server key only in apikey header',async()=>{const original=globalThis.fetch;const calls=[];globalThis.fetch=async(url,options)=>{calls.push({url,options,body:JSON.parse(options.body)});return {ok:true,json:async()=>url.endsWith('pf2027_start_run')?true:url.endsWith('pf2027_save_run')?'saved-id':[]}};try{
 const blocked=response();await session(request({}, {headers:{origin:'https://other.example','content-type':'application/json'}}),blocked);assert.equal(blocked.code,403);assert.equal(calls.length,0);
 const start=response();await session(request(),start);assert.equal(start.code,200);assert.match(start.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Lax/);
 const cookie=start.headers['Set-Cookie'].split(';')[0];const attempt={token:start.body.token,nickname:'Honza',score:0,metadata:{distance:0,saved:0}};
 const saved=response();await score(request(attempt,{headers:{origin:process.env.APP_ORIGIN,'content-type':'application/json',cookie}}),saved);assert.equal(saved.code,200);assert.equal(saved.body.id,'saved-id');
 const stranger=response();await score(request(attempt),stranger);assert.equal(stranger.code,400);
 const health=response();await status({method:'GET',headers:{}},health);assert.equal(health.body.ok,true);
 for(const c of calls){assert.equal(c.options.headers.apikey,process.env.SUPABASE_SECRET_KEY);assert.equal(c.options.headers.Authorization,undefined)}
 }finally{globalThis.fetch=original}});
test('database failures hide internal errors',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>({ok:false,json:async()=>({message:'SECRET DATABASE DETAILS'})});try{await assert.rejects(db('rpc/pf2027_top_runs',{}),e=>e.status===503&&!e.message.includes('SECRET DATABASE DETAILS'))}finally{globalThis.fetch=original}});
