import express from 'express';
import asyncWrapper from '../utils/async-wrapper.js';
const router = express.Router( );
import { channel, roomChannel } from '../index.js';
import { Room, Chat } from '../models/Room.js'; 
import { Guest, User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import AgoraToken from 'agora-token';
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = AgoraToken

import mongoose from 'mongoose';
const ROOM_SECRET_KEY = 'SoloLordPakaiEstes';




const generateRtcTokenForRoom = (participantId, roomId) => {
  // Rtc Examples
  const appId = 'd91d04d113ba4e6181f6da7f4cb9a1cc';
  const appCertificate = '5ee0129a61234f65bd4bfd5619178643';
  const channelName = roomId;
  const uid = participantId;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600*24

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
  // Build token with uid
  return RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
}

const createPeerJSID = (participantId, roomId) => {
  const uniqueId = new mongoose.Types.ObjectId().toString(); // Menggunakan timestamp dan angka acak, menghilangkan titik
  return "isacitra" + roomId+ "" + participantId + "" + uniqueId;
};

function createToken(roomId, guestId, userId) {
  const payload = {
    roomId: roomId,
    userId:userId,
    guestId: guestId,
    // Anda juga dapat menambahkan informasi lain ke dalam payload jika diperlukan
  };

  // Anda dapat mengganti 'rahasiaKunci' dengan kunci rahasia yang lebih aman
  const token = jwt.sign(payload, ROOM_SECRET_KEY, {
    expiresIn: '45m', // Token akan kedaluwarsa dalam 15 menit
  });

  return token;
}

function createScreenToken(roomId, guestId, userId) {
  const payload = {
    roomId: roomId,
    userId:userId,
    guestId: guestId+'-screenshare',
    // Anda juga dapat menambahkan informasi lain ke dalam payload jika diperlukan
  };

  // Anda dapat mengganti 'rahasiaKunci' dengan kunci rahasia yang lebih aman
  const token = jwt.sign(payload, ROOM_SECRET_KEY, {
    expiresIn: '45m', // Token akan kedaluwarsa dalam 15 menit
  });

  return token;
}

router.post('/addToRoomViaToken', async(req,res)=>{
  const {token} = req.body
  if(token){
    try{
      const decoded = jwt.verify(token, ROOM_SECRET_KEY);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimeInSeconds) {
          return res.status(401).json({ message: 'Token JWT telah kedaluwarsa' });
      }
      // tolong ambil field userId, guestId, participantType
      const { roomId, userId, guestId, } = decoded;
      const room = await Room.findById(roomId??'none');
      const participantData = userId? await User.findById(userId) : await Guest.findById(guestId);
      if(room){
        const participantId = userId ?? guestId
        const participant = {
          userId: userId,
          guestId:guestId,
          peerId: createPeerJSID(participantId,roomId)
        }
        room.participants.set( userId??guestId , participant);
        await room.save();
        const selectedRoom = await Room.findById(roomId).populate('participants.$*.userId participants.$*.guestId')
        .populate('host.userId host.guestId')
        .populate('coHosts.$*.userId coHosts.$*.guestId').populate('chats');
        if(selectedRoom){
          roomChannel.publish('update-room', {"roomId": selectedRoom._id, "room":selectedRoom})
          return res.json({room: selectedRoom, screenRtcToken:generateRtcTokenForRoom(participantId+'-screenshare', roomId),rtcToken:generateRtcTokenForRoom(participantId,roomId), participant: participantData, token: createToken(selectedRoom._id, userId?null:guestId, userId?userId:null )})
        }
      }
      return res.status(404).json({message: 'Room tidak ada atau sudah dihapus'})
    }catch(error){
          return res.status(401).json({message: 'Token JWT tidak valid'});
    }
  }
  return res.status(404).json({message: 'Token JWT tidak ada'});
})

router.post('/addToRoom', async (req,res)=>{
    try {
        const {roomId, isUser, participantId, password } = req.body;
        const selectedRoom = await Room.findById(roomId);
        if(! selectedRoom){
            return res.status(404).json({'message':'Room sudah dihapus atau kadaluwarsa'})
        }
        if(selectedRoom.password.trim() != password.trim()){
            return res.status(401).json({'message':'Autentikasi tidak valid'})
        }
        const participant = isUser
        ? { userId: participantId, guestId: null, peerId: createPeerJSID(participantId,roomId) }
        : { guestId: participantId, userId: null,  peerId: createPeerJSID(participantId,roomId)}
        selectedRoom.participants.set( participantId , participant);
        await selectedRoom.save();
        const participantData = isUser? await User.findById(participantId) : await Guest.findById(participantId);
        const roomToPublish =  await Room.findById(roomId).populate('participants.$*.userId participants.$*.guestId')
        .populate('host.userId host.guestId')
        .populate('coHosts.$*.userId coHosts.$*.guestId').populate('chats');
        if(! roomToPublish){
          return res.status(404).json({'message':'Room sudah dihapus atau kadaluwarsa'})
      }
        roomChannel.publish('update-room', {"roomId": roomToPublish._id, "room":roomToPublish})
        return res.json({"roomId":roomToPublish._id,screenRtcToken:generateRtcTokenForRoom(participantId+'-screenshare', roomId),"rtcToken":generateRtcTokenForRoom(participantId,roomId), "room":roomToPublish,participant:participantData, token: createToken(roomToPublish._id, isUser? null: participantId, isUser? participantId:null)})
    } catch (error) {
        return res.status(500).json({'message':'Terjadi kesalahan pada server'})
    }
  });

  router.post('/reaction', async (req,res)=>{
    try {
      const {reaction, roomId, guestId} = req.body;
      const room = await Room.findById(roomId);
      if(!room){
        return res.status(404).json({'message': 'Room tidak ditemukan'});
      }
      const participant = room.participants[guestId];
      if(!participant){
        return res.status(404).json({'room':room,'participantId':guestId,'participant':participant,'message': 'Partisipan tidak ditemukan'});
      }
      participant.reaction = participant.reaction == reaction ? 'no-reaction': reaction;
      await room.save();
      const roomToPublish = await Room.findById(roomId).populate('participants.$*.userId participants.$*.guestId').
      populate('chats')
          .populate('host.userId host.guestId')
          .populate('coHosts.$*.userId coHosts.$*.guestId');
      roomChannel.publish('update-room', { "roomId": roomId, "room": roomToPublish });
      return res.json({ "roomId": roomId, "room": roomToPublish });

    } catch (error) {
      return res.status(500).json({'message': 'terjadi kesalahan dalam membuat room', 'error':error})
    }
  })


// Endpoint untuk membuat ruangan baru
router.post('/createRoom', async (req, res) => {
    try {
      // Ambil data yang diperlukan dari body request
      const { title, description, password, scheduledTime, host, hostKey, roomId, status } = req.body;
      console.log(req.body)
  
      // Inisialisasi coHosts sebagai Map kosong
      const coHosts = new Map();
      const endTime= new Date(scheduledTime);
      endTime.setDate(endTime.getDate() + 1);
  
      // Buat instance Room baru
      const newRoom = new Room({
        title,
        description,
        password,
        scheduledTime,
        host,
        hostKey,
        coHosts, 
        status,
        endTime,
        _id:roomId,
        chats:[]
      });
  
      // Simpan ruangan ke dalam database
      const savedRoom = await newRoom.save();
  
      // Kirim respon dengan data ruangan yang baru dibuat
      res.json(savedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  });

router.post('/addCommentToRoom', async (req,res)=>{
  try {
    const {roomId, senderId, receiverId, message} = req.body;
    const room = await Room.findById(roomId);
    if(!room){
      return res.status(404).json({'message': 'Room tidak ditemukan'})
    }
    const chat = new Chat({
      sender: senderId,
      message: message,
      receiver: receiverId == 'all'? null : receiverId
    })
    await chat.save()
    room.chats.push(chat);
    await room.save();
    const roomToPublish = await Room.findById(roomId).populate('participants.$*.userId participants.$*.guestId').
    populate('chats')
        .populate('host.userId host.guestId')
        .populate('coHosts.$*.userId coHosts.$*.guestId');
    roomChannel.publish('update-room', { "roomId": roomId, "room": roomToPublish });
    return res.json({ "roomId": roomId, "room": roomToPublish });

  } catch (error) {
    return res.status(500).json({'message': 'terjadi kesalahan dalam membuat room', 'error':error})
  }
})
  

router.post('/removeFromRoom', async (req, res) => {
    try {
      const { roomId, participantId } = req.body;
      const selectedRoom = await Room.findById(roomId);
  
      if (!selectedRoom) {
        return res.status(400).json({ 'message': 'Room sudah dihapus atau kadaluwarsa' });
      }
  
      // Periksa apakah partisipan dengan ID tertentu ada dalam room
      if (selectedRoom.participants.has(participantId)) {
        // Hapus partisipan dari room
        selectedRoom.participants.delete(participantId);
        let hostId = selectedRoom.host.userId? selectedRoom.host.userId:selectedRoom.host.guestId;
        let coHostId = selectedRoom.coHost.keys().find((key)=> key == participantId);
        hostId = participantId == hostId? hostId : null;
        // Periksa apakah partisipan yang dihapus adalah host
        if (hostId) {
          // Jika host yang dihapus, cari co-host atau partisipan lain yang bisa menjadi host
          if(hostId == participantId){
            let newHostId = null;
            let newHostType = null;

  
          // Cari co-host jika ada
          for (const [key, value] of selectedRoom.coHost) {
            newHostId = key;
            newHostType = newHostId == value.userId ? "user":"guest";
            selectedRoom.coHost.remove(key)
            break;
          }
  
          // Jika tidak ada co-host, pilih salah satu partisipan yang tersisa sebagai host baru
          if (!newHostId && selectedRoom.participants.size > 0) {
            for (const [key, value] of selectedRoom.participants){
                newHostId = key;
                newHostType = newHostId == value.userId ? "user":"guest";
                break;
            }
          }
  
          // Jika ada host baru yang dipilih, atur ulang host dalam room
          if (newHostId) {
            if(newHostType == "user"){
                selectedRoom.host.userId = newHostId;
            }
            else{
                selectedRoom.host.guestId = newHostId;
            }
            if(newHostType){
                selectedRoom.host.participantType = newHostType
            }
          }
          }
        }
        else if(coHostId){
            selectedRoom.coHost.delete(coHostId)
        }

  
        await selectedRoom.save();
        const roomToPublish = await Room.findById(selectedRoom._id).
        populate('participants.$*.userId participants.$*.guestId').populate('chats')
        .populate('host.userId host.guestId')
        .populate('coHosts.$*.userId coHosts.$*.guestId');

        console.log('bocil dengan ID ', participantId, ' telah dihapus dari room!!!!')
        // Mengirim pembaruan ruangan melalui channel yang sesuai
        roomChannel.publish('update-room', { "roomId": selectedRoom._id, "room": roomToPublish });
        return res.json({ "roomId": selectedRoom._id, "room": roomToPublish });
      } else {
        return res.status(400).json({ 'message': 'Partisipan tidak ditemukan dalam room' });
      }
    } catch (error) {
      return res.status(500).json({ 'message': 'Terjadi kesalahan pada server' });
    }
  });

// Endpoint untuk menghapus ruangan berdasarkan ID
router.delete('/deleteRoom/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params;
  
      // Cari ruangan berdasarkan ID
      const selectedRoom = await Room.findById(roomId);
  
      // Jika ruangan tidak ditemukan
      if (!selectedRoom) {
        return res.status(404).json({ message: 'Ruangan tidak ditemukan' });
      }
  
      // Hapus ruangan dari database
      await selectedRoom.remove();
  
      // Kirim respon berhasil
      res.json({ message: 'Ruangan berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  });
  
  // Endpoint POST untuk membuat tamu baru
router.post('/guest', async (req, res) => {
    try {
      // Ambil data tamu dari body permintaan
      const { username, roomId, guestId } = req.body;
  
      // Buat tamu baru dengan ID ruangan yang terkait
      const guest = new Guest({ username, room: roomId, _id:guestId });
  
      // Simpan tamu ke basis data
      await guest.save();
  
      // Kirim respons sukses
      return res.json(guest);
    } catch (error) {
      // Tangani kesalahan
      return res.status(500).json({ error: 'Gagal membuat tamu baru' });
    }
  });
  router.get('/:id', async (req,res)=>{
    try {
      console.log("ada disini")
      const {id} = req.params;
      const room = await Room.findById(id).populate('participants.$*.userId participants.$*.guestId').populate('chats')
      .populate('host.userId host.guestId')
      .populate('coHosts.$*.userId coHosts.$*.guestId');
      console.log("ini room", room)
      if(!room){
        return res.status(404).json({'message':'Room sudah dihapus atau kadaluwarsa'})
      }
      console.log("sini lah")
      return res.json({room: room, id: room._id})
    } catch (error) {
      console.log(error)
      return res.status(500).json({'message':'Terdapat kesalahan di sisi internal server'})
    }
  })

  export default router;
