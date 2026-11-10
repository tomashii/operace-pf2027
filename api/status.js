import {gate,db,fail} from '../server/core.js';
export default async function handler(req,res){try{gate(req,res,'GET');await db('rpc/pf2027_top_runs',{});res.status(200).json({ok:true,message:'Web je připojený k databázi Supabase.'})}catch(e){fail(res,e)}}
