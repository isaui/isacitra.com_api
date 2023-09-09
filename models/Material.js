import mongoose from 'mongoose';



const videoSchema = new mongoose.Schema({
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
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

})
const materiSchema = new mongoose.Schema({
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    chapters:[chapterSchema]
});

const MataKuliah = mongoose.model("Matkul", MataKuliahSchema);
export default MataKuliah;