import express from 'express';
import mongoose from 'mongoose';
import {User} from './models/User.js';
import cors from 'cors';
import BlogPost from './models/Post.js';
import asyncWrapper from './utils/async-wrapper.js';
import ArticleRoute from './route/article.js';
import AuthenticationRoute from './route/authentication.js';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
//import Comment from './models/Comment.js';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

const allowCors2 = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ganti '*' dengan domain yang sesuai jika diperlukan
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next(); // Lanjutkan ke middleware atau handler selanjutnya
};




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
app.use(cors());
//app.use(allowCors(handler));
//app.use(allowCors2);
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
app.use('/articles', ArticleRoute);




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






app.get('/', asyncWrapper(async (req,res)=> {
  const topPicks = await BlogPost.aggregate([
    { $sample: { size: 3 } },
  ]);
    res.send({topPicks})
}))

app.listen(PORT, () => {
    console.log('backend berjalan di port 3000')
})
