import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const availableColors = ['#FF5733', '#FFC300', '#33FF57', '#33A2FF', '#C133FF', '#FF33D7', '#33FFF7', '#3333FF', '#FF33A2', '#33FFB4'];
// Skema Profil Pengguna
const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  bio: String,
  avatar: String,
  // Informasi tambahan lainnya tentang profil
});

// Skema Peran Pengguna
const roleSchema = new mongoose.Schema({
  name: String,
  // Hak akses, izin, atau atribut lain yang berhubungan dengan peran
});

// Skema Pengguna
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  profile: profileSchema,
  role: roleSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
function getRandomColor() {
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}
const guestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  color: {
    type:String,
    required:true,
    default: function (){
      return getRandomColor()
    }
  }, // Menyimpan kode warna dalam bentuk string
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Gantilah 'Room' dengan model ruangan Anda
  },
});
userSchema.plugin(passportLocalMongoose);

const Profile = mongoose.model('Profile', profileSchema);
const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const Guest = mongoose.model('Guest', guestSchema);


export {
  Profile,
  Role,
  User,
  Guest
};