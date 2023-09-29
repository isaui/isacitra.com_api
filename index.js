import express from 'express';
import mongoose from 'mongoose';
import {User, Guest} from './models/User.js';
import { Room } from './models/Room.js';
import cors from 'cors';
import BlogPost from './models/Post.js';
import asyncWrapper from './utils/async-wrapper.js';
import ArticleRoute from './route/article.js';
import AuthenticationRoute from './route/authentication.js';
import session from 'express-session';
import flash from 'connect-flash';
//import {Server} from 'socket.io';
import http from 'http';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {MataKuliah, Chapter} from './models/Material.js';
import MataKuliahRoute from './route/matakuliah.js';
import VideoRoute from './route/video-conference.js';
import Ably from 'ably';
import { CronJob } from 'cron';

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

const PORT = process.env.PORT || 3001;
//const SERVER_PORT = process.env.HTTP_PORT || 8000;
const server = app.listen(PORT, () => {
  console.log('backend berjalan di port 3000')
})

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

const ably = new Ably.Realtime({
  key: 'o7gv-w.ulW0zw:olcD9FroY5pv3a9EhFzb4X7Hth-nedgovu4bdz8bsFI'
})
const channel = ably.channels.get('update-matkul-channel')
const roomChannel = ably.channels.get('room-channel')

app.use(cors());
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
app.use('/learn', MataKuliahRoute);
app.use('/video', VideoRoute)


const deleteExpiredRooms = async () => {
  try {
    const currentDate = new Date();
    // Gantilah kondisi ini dengan kondisi yang sesuai dengan aturan Anda
    const expiredRooms = await Room.find({ endTime: { $lt: currentDate } });

    if (expiredRooms.length > 0) {
      // Hapus semua room yang sudah kadaluwarsa
      await Room.deleteMany({ _id: { $in: expiredRooms.map(room => room._id) } });
      console.log(`Menghapus ${expiredRooms.length} room yang sudah kadaluwarsa.`);
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat menghapus room yang kadaluwarsa:', error);
  }
};

async function updateRoomStatus() {
  try {
    const currentTime = new Date();
    const roomsToActivate = await Room.find({
      status: 'scheduled',
      scheduledTime: { $lte: currentTime }, // Filter ruangan dengan scheduledTime <= waktu saat ini
    });

    for (const room of roomsToActivate) {
      room.status = 'actived';
      await room.save();
      console.log(`Room "${room.title}" telah diubah statusnya menjadi "actived".`);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}
const updateRoomJob = new  CronJob('* * * * *', updateRoomStatus);
const job = new CronJob('0 2 * * *', async () => {
  // Kode untuk menghapus room yang telah berakhir di sini
  deleteExpiredRooms()
}, null, true, 'Asia/Jakarta');
updateRoomJob.start()
job.start()

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



export {
  channel,
  roomChannel
}