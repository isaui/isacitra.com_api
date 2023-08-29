import express from 'express';
import mongoose from 'mongoose';
import {User} from './models/User.js';
import cors from 'cors';
import BlogPost from './models/Post.js';
import asyncWrapper from './utils/async-wrapper.js';
//import ArticleRoute from './route/article.js';
import AuthenticationRoute from './route/authentication.js';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';



const url = "mongodb://localhost:27017/isacitraweb"
const atlasUrl = "mongodb+srv://isacitra:ENLkYSN2evCAab5D@isacitraweb.batvch9.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://isacitra:HcUUg1NBxFuiBw8Y@isacitraweb.batvch9.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on("error",console.error.bind(console, "database connection error"))
db.once("open", ()=>{
    console.log('Mongo database connected')
} )
const app = express();
const PORT = 3001;
const corsOptions = {
    origin:'https://isacitra.com'
}
const sessionConfig = {
  secret: 'sipalingambisius',
  resave:false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
  
}

const resetAll = async () => {
  await User.deleteMany({})
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})


app.use('/authentication', AuthenticationRoute);
//app.use('/articles', ArticleRoute);




app.get('/fakeUser', asyncWrapper(async(req,res)=>{
  const fakeUser = {
    username: 'BambangGaming',
    email: 'bambang@example.com',
    profile: {
      firstName: 'Bambang',
      lastName: 'Satrio',
      bio: 'Seorang profesional dalam teknologi.',
      avatar: '',
    },
    role: {
      name: 'user'
    }
  };
  const userCreated = new User(fakeUser);
  const newUser = await User.register(userCreated, 'chicken')
  res.send(newUser)
}))


app.post('/articles', asyncWrapper(async (req, res) => {
  try {
    // Proses data yang diterima, misalnya menyimpannya ke database
    
    const {isUpdate, currentId, user, ...postData} = req.body;
    var post;
    if(isUpdate){
      post = await BlogPost.findByIdAndUpdate(currentId);
      Object.assign(post, postData);
    }
    else{
      post = new BlogPost({author:user,...postData})
    }
      
      if(!post.categories.includes('semua')){
        post.categories.unshift(...['semua'])
      }
      await post.save();
      res.send({message:'berhasil menambahkan artikel'})
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}));

app.delete('/articles/:id', asyncWrapper(async (req,res)=> {
  const {id} = req.params;
  const deletedArticle = await BlogPost.findByIdAndDelete(id);
  if(!deletedArticle) {
    return res.status(404).json({ message: 'Artikel tidak ditemukan' });
  }
  res.send({ message: 'Artikel berhasil dihapus' })
}))

app.get('/articles', asyncWrapper(async (req,res)=> {
  const articles = await BlogPost.find({}).populate('author').populate('comments')
  res.send({articles})
}))
app.post('/articles/edit', asyncWrapper(async (req,res)=> {
  const {user} = req.body;
  
  const articles = await BlogPost.find({author:user._id}).populate('author').populate('comments')
  res.send({articles})
}))

app.get('/articles/new', asyncWrapper(async(req,res)=>{
  console.log('siapa yang login ayo jawab!! ', req.user)
  console.log('hmm hey buddy you are not login')
  res.send({'status':'success'})
}) )

app.post('/articles/update-reaction', asyncWrapper(async (req,res,next)=>{
  const {likes, dislikes, postId, userId} = req.body;
  await BlogPost.findByIdAndUpdate(postId, {likes: likes, dislikes: dislikes})
  console.log(likes, dislikes)
  res.send({'message':'good'})
}))

app.post('/articles/subscription', asyncWrapper(async(req,res)=>{
  try {
    const {email} = req.body;
  const exist = await Subscription.findOne({email: email})
  if(exist){
    return res.status(400).json({'message': 'Anda telah melakukan subscription sebelumnya'})
  }
  const newSubscriber = new Subscription({email:email})
  res.status(200).json({'message':'Sukses melakukan subscription'})
  await newSubscriber.save()
  } catch (error) {
    res.status(500).json({error:error, message:'Terdapat kesalahan pada server'})
  }
}))
app.get('/articles/subscription', asyncWrapper(async (req, res) => {
  try {
    const subscribers = await Subscription.find({}, 'email'); // Mengambil hanya kolom 'email'
    const emailList = subscribers.map(subscriber => subscriber.email);
    res.status(200).json(emailList);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil daftar langganan' });
  }
}));

app.get('/articles/search', asyncWrapper(async (req,res)=> {
  const searchTerm = req.query.searchTerm;
  try {
    const searchResults = await BlogPost.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // Pencarian berdasarkan judul
        { categories: { $regex: searchTerm, $options: 'i' } }, // Pencarian berdasarkan kategori
      ],
    }).populate('author');
    console.log(searchResults)

    res.send({searchResults});
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).send({ error: 'Internal server error' });
  }

}))

app.get('/articles/:id', asyncWrapper( async (req,res,next)=>{
    const {id} = req.params;
    var post;
    try {
      post = await BlogPost.findById(id).populate('author').populate('comments');
      post.incrementViews();
    } catch (error) {
      next(error)
      return;
    }
    
    const postCategories = post.categories;
    const filteredCategories = postCategories.filter(category => category !== 'semua');
    const relatedArticles = await BlogPost.find({categories:{$in:filteredCategories}, _id: { $ne: post._id }}).limit(5).populate('author');
    res.send({post, relatedArticles });
}))



app.get('/', asyncWrapper(async (req,res)=> {
  const topPicks = await BlogPost.aggregate([
    { $sample: { size: 3 } },
  ]);
    res.send({topPicks})
}))

app.listen(PORT, () => {
    console.log('backend berjalan di port 3000')
})