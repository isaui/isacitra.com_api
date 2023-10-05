import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest'
  },
  message:{
    type:String,
    default: ''
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }

})

const roomSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        default:""
    },
    password: {
        type: String,
        default: ""
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }],
    participants: {
      type: Map,
      of: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Gantilah 'User' dengan model pengguna terdaftar Anda
        },
        guestId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Guest', // Gantilah 'Guest' dengan model pengguna tamu Anda
        },
        peerId:{
          type:String
        }
      },
      default:{}
    },
    host: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Gantilah 'User' dengan model pengguna terdaftar Anda
          },
        guestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guest', // Gantilah 'Guest' dengan model pengguna tamu Anda
        },
        participantType: {
            type: String,
            enum: ["user","guest"],
            required: true
        }
      },
    hostKey: {
        type: String, // Tipe data hostKey bisa disesuaikan dengan kebutuhan Anda
        required: true
    },
    coHosts: {
        type: Map,
        of: {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Gantilah 'User' dengan model pengguna terdaftar Anda
          },
          guestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guest', // Gantilah 'Guest' dengan model pengguna tamu Anda
          },
        },
      },
    status: { 
      type: String,
      enum: ['scheduled', 'actived', 'ended'],
      default: 'scheduled',
    },
  });
  
  const Room = mongoose.model('Room', roomSchema);
  const Chat = mongoose.model('Chat', chatSchema);
  export {Room, Chat}