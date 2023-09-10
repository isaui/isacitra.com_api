import mongoose, { Mongoose } from 'mongoose';



const videoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description:{
        type:String,
        default:""
    }
});

const noteSchema = new mongoose.Schema({
    thumbnail: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tableOfContents:{
      type: String,
      default: JSON.stringify([])
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [{
      type: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  

  })
const materiSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    videos:[
        videoSchema
    ],
    notes:[
        noteSchema
    ]

})
const chapterSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(), // Menghasilkan ObjectId secara otomatis jika tidak ada
        required: true, // Membuat _id menjadi required
    },
    title:{
        type:String,
        required:true
    },
    bab:{
        type:String,
        default:""
    },
    materi:[
        materiSchema
    ]
});
const MataKuliahSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        default:""
    },
    categories:[{
        type:String,
        required:true
    }],
    thumbnail:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chapters:[chapterSchema]
});

const MataKuliah = mongoose.model("Matkul", MataKuliahSchema);
const Chapter = mongoose.model("Chapter", chapterSchema)
export {MataKuliah, Chapter};