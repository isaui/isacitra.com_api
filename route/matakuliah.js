import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
const router = express.Router( );
import MataKuliah from '../models/Material.js';

router.post('/', asyncWrapper(async (req,res)=>{
    const data = req.body;
    try {
        const tidakValid = await MataKuliah.findOne({title:data['title']})
    if(tidakValid){
        return res.status(400).json({message:"Maaf judul sudah ada"})
    }
    const newMataKuliah = new MataKuliah({...data});
    await newMataKuliah.save();
    return res.json(newMataKuliah);
    } catch (error) {
        return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
    }
}))

router.get('/', async (req, res) => {
    try {
      const mataKuliahList = await MataKuliah.find().populate('chapters').populate('author'); // Mengambil semua data mata kuliah dari database
      res.json(mataKuliahList); // Mengirim daftar mata kuliah sebagai respons JSON
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan dalam server" }); // Menangani kesalahan jika terjadi
    }
  });

  export default router;