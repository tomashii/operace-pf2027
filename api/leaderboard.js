import {gate,db,fail} from '../server/core.js';
export default async function handler(req,res){try{gate(req,res,'GET');res.status(200).json({rows:await db('rpc/pf2027_top_runs',{})})}catch(e){fail(res,e)}}
