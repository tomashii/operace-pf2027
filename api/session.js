import {randomUUID} from 'node:crypto';
import {gate,env,client,db,sign,error,fail} from '../server/core.js';
export default async function handler(req,res){try{gate(req,res,'POST');const e=env(),c=client(req,res,e.secret),id=randomUUID(),at=Date.now();const ok=await db('rpc/pf2027_start_run',{p_id:id,p_client:c.browser,p_ip:c.ip});if(!ok)throw error('Příliš mnoho pokusů. Počkej minutu.',429);res.status(200).json({token:sign({id,at,client:c.browser},e.secret)})}catch(e){fail(res,e)}}
