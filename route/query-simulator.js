import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
import { querySimulator } from '../db/query.js';

const router = express.Router();

router.post('/', async (req,res)=>{
    try {
        const data = req.body;
        const queryString = data['query'];
        const resultData = await querySimulator(queryString);
        return res.json({'message':'SUCCESS', 'query_result': JSON.stringify(resultData.rows)})
    } catch (error) {
        console.log(error)
        return res.json({'message':'ERROR', 'query_result':error.message})
    }
})

export default router