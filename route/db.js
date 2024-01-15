import express from 'express';
import query from '../db/query.js';
import asyncWrapper from '../utils/async-wrapper.js';
const router = express.Router();

router.post('/', asyncWrapper(async (req, res) => {
    try {
      // Proses data yang diterima, misalnya menyimpannya ke database
        const {queryString} = req.body
        const queryResult = await query(queryString)
        res.json({ message: 'Berhasil mengquery', result: queryResult });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  }));
export default router