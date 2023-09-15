import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
const router = express.Router( );
import {MataKuliah, Chapter} from '../models/Material.js';
import { channel } from '../index.js';

// Menambahkan Mata Kuliah
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
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// Menambahkan Notes
router.post('/addNotes', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, idMateri,  dataMateri } = req.body;
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

// Menambahkan Video
router.post('/addVideo', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, idMateri,  dataMateri } = req.body;
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
      materi.videos.push(dataMateri)
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


// menambah section atau chapter
router.post('/addSection', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, dataChapter } = req.body;

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
  matkul.chapters.push(dataChapter)
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

router.post('/editSection', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, title, bab } = req.body;

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
  const chapter = matkul.chapters.find(ch => ch._id == idChapter)
  if(chapter){
    chapter.title = title;
    chapter.bab = bab;
  }
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// delete section
router.post('/deleteSection', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter } = req.body;
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
  matkul.chapters = matkul.chapters.filter(chapter => chapter._id != idChapter)
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// add materi
router.post('/addMateri', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, dataMateri } = req.body;
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
  const chapter = matkul.chapters.find(ch => ch._id == idChapter);
  if(chapter){
    chapter.materi.push(dataMateri);
  }
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// edit materi
router.post('/editMateri', asyncWrapper( async (req,res)=>{
  const {idMatkul, idChapter, idMateri, title } = req.body;
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
  const chapter = matkul.chapters.find(ch => ch._id == idChapter);
  if(chapter){
    const materi = chapter.materi.find(mt => mt._id == idMateri);
    if(materi){
      materi.title = title
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
// delete materi
router.post('/deleteMateri', asyncWrapper(async (req,res)=>{
  
  const {idMatkul, idChapter, idMateri } = req.body;
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
  const chapter = matkul.chapters.find(ch => ch._id == idChapter) 
  if(chapter){
    chapter.materi = chapter.materi.filter(mt => mt._id != idMateri);
  }
  await matkul.save()
  channel.publish('update-matkul', matkul)
  return res.json(matkul);
  } catch (error) {
      console.log(error)
      return res.status(500).json({error:error, message:error.message??"Terjadi kesalahan dalam server"})
  }
}))

// Memuat seluruh mata kuliah
router.get('/', async (req, res) => {
    try {
      const mataKuliahList = await MataKuliah.find().populate('chapters').populate('author'); // Mengambil semua data mata kuliah dari database
      res.json(mataKuliahList); // Mengirim daftar mata kuliah sebagai respons JSON
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan dalam server" }); // Menangani kesalahan jika terjadi
    }
  });

// Memuat mata kuliah tertentu
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