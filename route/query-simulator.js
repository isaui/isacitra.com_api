import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
import { querySimulator } from '../db/query.js';
const router = express.Router( );

router.post('/', asyncWrapper(async (req,res)=>{
    try {
        const data = req.body;
        const queryString = data['query'];
        const res = await querySimulator(queryString);
        res.send({'message':'SUCCESS', 'data': JSON.stringify(res.rows)})
    } catch (error) {
        res.send({'message':'ERROR', 'data':error.message})
    }
}) )

export default router