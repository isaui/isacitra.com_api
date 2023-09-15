import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
const router = express.Router( );
import {MataKuliah, Chapter} from '../models/Material.js';
import { channel } from '../index.js';

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

router.post('/addSection/:id', asyncWrapper(async (req,res)=>{
  const {id} = req.params;
  const newChapterData = req.body;
  const NewChapter = new Chapter({...newChapterData})
  try {
      const matkul = await  MataKuliah.findById(id);
  if(!matkul){
      return res.status(400).json({message:"Mata Kuliah Tidak Ada atau Telah Dihapus"})
  }
  matkul.chapters.push(NewChapter)// todo
  await matkul.save();
  return res.json(NewChapter);
  } catch (error) {
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

router.post('/edit/:id', asyncWrapper(async (req,res)=>{
  const {id} = req.params;
  const matkulData = req.body;
  try {
      const matkul = await  MataKuliah.findByIdAndUpdate(id, { $set: matkulData }, {new:true}).populate('author').populate('chapters').populate({
        path: 'chapters.materi.notes.author',
        model: 'User' // Ganti 'User' dengan nama model yang sesuai
    }).populate({
      path: 'chapters.materi.videos.author',
      model: 'User' // Ganti 'User' dengan nama model yang sesuai
  });
  if(!matkul){
      return res.status(400).json({message:"Mata Kuliah Tidak Ada atau Telah Dihapus"})
  }
  // todo: perbarui data matkul dengan matkuldata
  await channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// Menambahkan Notes
router.post('/addNotes', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, idMateri,  dataMateri } = req.body;
  console.log(req.body)
  try {
      const matkul = await  MataKuliah.findById(idMatkul).populate('author').populate('chapters').populate({
        path: 'chapters.materi.notes.author',
        model: 'User' // Ganti 'User' dengan nama model yang sesuai
    }).populate({
      path: 'chapters.materi.videos.author',
      model: 'User' // Ganti 'User' dengan nama model yang sesuai
  });

  if(!matkul){
      return res.status(400).json({message:"Mata Kuliah Tidak Ada atau Telah Dihapus"})
  }
  
  const chapter = matkul.chapters.find((ch) => ch._id == idChapter);
  if(chapter){
    const materi = chapter.materi.find((mt) => mt._id == idMateri)
    if(materi){
      materi.notes.push(dataMateri)
    }
    
  }
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
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
  router.get('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const mataKuliah = await MataKuliah.findById(id).populate('author').populate('chapters').populate({
        path: 'chapters.materi.notes.author',
        model: 'User' // Ganti 'User' dengan nama model yang sesuai
    }).populate({
      path: 'chapters.materi.videos.author',
      model: 'User' // Ganti 'User' dengan nama model yang sesuai
  }); // Mengambil semua data mata kuliah dari database
      res.json(mataKuliah); // Mengirim daftar mata kuliah sebagai respons JSON
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan dalam server" }); // Menangani kesalahan jika terjadi
    }
  });

  export default router;