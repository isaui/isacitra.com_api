import express from 'express';
import query from '../db/query.js';
import asyncWrapper from '../utils/async-wrapper.js';
import { formatDate, formatISO8601ToHHMM } from '../utils/modules/demo.js';
import nodemailer from 'nodemailer';
const router = express.Router();

const sendNotificationEmail = async (id) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // misalnya 'gmail'
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: 'isacitralearning@gmail.com',
        pass: 'rtsj nhtr lwya pzcb'
    }
  });
  const queryResult = await query(`SELECT BOOKING_DEMO.email, BOOKING_DEMO.nomorMahasiswa, BOOKING_DEMO.platform, BOOKING_DEMO.bookingDemoId,
          DEMO_SESSION.startTime, DEMO_SESSION.endTime, DEMO_SESSIONS_DATE.date,
          DEMO_EVENT.title, DEMO_EVENT.startDate, DEMO_EVENT.endDate, DEMO_EVENT.email AS demoeventemail FROM BOOKING_DEMO INNER JOIN DEMO_SESSION ON BOOKING_DEMO.demoSessionId = DEMO_SESSION.demoSessionId 
          INNER JOIN DEMO_SESSIONS_DATE ON DEMO_SESSIONS_DATE.demoSessionDateId = DEMO_SESSION.demoSessionDateId INNER JOIN DEMO_EVENT ON
          DEMO_SESSIONS_DATE.demoEventId = DEMO_SESSIONS_DATE.demoEventId
          WHERE BOOKING_DEMO.bookingDemoId = '${id}' LIMIT 1;`)
          const data = queryResult.rows[0];
          const recipientEmail = data.email;
          const npm = data.nomormahasiswa;
          const platform = data.platform;
          const startTime = data.starttime;
          const endTime = data.endtime;
          const eventName = data.title;
          const date = data.date
          const demoEventEmail = data.demoeventemail
// EMAIL DATA -----------------------------------------------------------
          const subject = `Mendaftar Demo`
          const html = `
          <!doctype html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <h1 style="margin-bottom: 0.5rem; 
            font-size: 1.25rem;
            line-height: 1.75rem; 
            font-weight: 700; 
            color: #4F46E5; 
            ">
              Permisi, ${npm}
            </h1>
            <p style="margin-bottom: 0.5rem; 
            font-size: 1rem;
            line-height: 1.5rem; 
            text-align: justify;
            ">
             Anda telah memilih untuk melakukan
            demo tersebut pada waktu ${formatISO8601ToHHMM(startTime)} - ${formatISO8601ToHHMM(endTime)} WIB pada tanggal ${formatDate(date)}.
            Apabila Anda berencana untuk mengubah jadwal Anda, silahkan kunjungi web dibawah:
            </p>
            <div  style='display: flex; margin-bottom: 0.5rem; flex-direction: column; 
            justify-content: center; align-items: center;  border-radius: 0.375rem;'>
             <a href="${'https://isacitra.com/jadwal'}" style="padding-top: 0.25rem; padding-bottom: 0.25rem; padding-left: 0.5rem;
            padding-right: 0.5rem; border-radius: 0.375rem; font-size: 1.125rem;
             line-height: 1.75rem; 
             text-align: center; 
             color: #ffffff; 
             background-color: #3730A3;
             ">MELUNCUR</a>
            </div>
            <p style="margin-bottom: 0.5rem; 
            font-size: 1rem;
            line-height: 1.5rem; 
            text-align: justify;
            ">
            Pada demo tersebut, Anda memilih menggunakan platform ${platform}. 
            ${platform == 'discord'? 'Seperti biasa di channel discord, Ok.' : 'Nanti saya akan infokan linknya.'}
            </p>
            <p style="margin-bottom: 0.5rem; 
            font-size: 1rem;
            line-height: 1.5rem; 
            text-align: justify;
            ">
            Isa.
            </p>
          </body>
          </html>
          
          `
// EMAIL OPTIONS ------------------------------------------------------------
          const mailOptions = {
            from: {
              name: 'Isa Citra',
              address:'isacitralearning@gmail.com'
            },
            to: recipientEmail,
            subject: subject,
            html: html
        };
        const mailMeOptions = {
          from: {
            name: 'Isa Citra',
            address:'isacitralearning@gmail.com'
          },
          to: demoEventEmail,
          subject: 'INFO: '+ subject,
          html: html
        }
        
        // Kirim email --------------------------------------------------------
        await new Promise((resolve, reject) => {
          // send mail
          transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                  console.error(err);
                  reject(err);
              } else {
                  console.log(info);
                  resolve(info);
              }
          });
      });
      await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailMeOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });


}

const sendInformationEmail = async (id, text, subject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // misalnya 'gmail'
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: 'isacitralearning@gmail.com',
        pass: 'rtsj nhtr lwya pzcb'
    }
  });
  const queryResult = await query(`SELECT BOOKING_DEMO.email, BOOKING_DEMO.nomorMahasiswa, BOOKING_DEMO.platform, BOOKING_DEMO.bookingDemoId,
          DEMO_SESSION.startTime, DEMO_SESSION.endTime, DEMO_SESSIONS_DATE.date,
          DEMO_EVENT.title, DEMO_EVENT.startDate, DEMO_EVENT.endDate, DEMO_EVENT.email AS demoeventemail FROM BOOKING_DEMO INNER JOIN DEMO_SESSION ON BOOKING_DEMO.demoSessionId = DEMO_SESSION.demoSessionId 
          INNER JOIN DEMO_SESSIONS_DATE ON DEMO_SESSIONS_DATE.demoSessionDateId = DEMO_SESSION.demoSessionDateId INNER JOIN DEMO_EVENT ON
          DEMO_SESSIONS_DATE.demoEventId = DEMO_SESSIONS_DATE.demoEventId
          WHERE BOOKING_DEMO.bookingDemoId = '${id}' LIMIT 1;`)
          const data = queryResult.rows[0];
          const recipientEmail = data.email;
          const npm = data.nomormahasiswa;
          const platform = data.platform;
          const startTime = data.starttime;
          const endTime = data.endtime;
          const eventName = data.title;
          const date = data.date
          const demoEventEmail = data.demoeventemail
  
// EMAIL DATA -----------------------------------------------------------
  const html = `
          <!doctype html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <h1 style="margin-bottom: 0.5rem; 
            font-size: 1.25rem;
            line-height: 1.75rem; 
            font-weight: 700; 
            color: #4F46E5; 
            ">
              Update Demo
            </h1>
            <p style="margin-bottom: 0.5rem; 
            font-size: 1rem;
            line-height: 1.5rem; 
            text-align: justify;
            ">Permisi ${npm}, 
            ${eventName} dengan id ${id} yang dilaksanakan pada ${formatISO8601ToHHMM(startTime)} - ${formatISO8601ToHHMM(endTime)} WIB ${text}
            </p>
            <p style="margin-bottom: 0.5rem; 
            font-size: 1rem;
            line-height: 1.5rem; 
            text-align: justify;
            ">
            Isa.
            </p>
          </body>
          </html>
          
          `
    // EMAIL OPTIONS ------------------------------------------------------------
    const mailOptions = {
      from: {
        name: 'Isa Citra',
        address:'isacitralearning@gmail.com'
      },
      to: recipientEmail,
      subject: subject,
      html: html
  };

  const mailMeOptions = {
    from: {
      name: 'Isa Citra',
      address:'isacitralearning@gmail.com'
    },
    to: demoEventEmail,
    subject: 'INFO: '+ subject,
    html: html
  }
  
  // Kirim email --------------------------------------------------------
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

  await new Promise((resolve, reject) => {
  // send mail
  transporter.sendMail(mailMeOptions, (err, info) => {
      if (err) {
          console.error(err);
          reject(err);
      } else {
          console.log(info);
          resolve(info);
      }
  });
});
  
}

router.post('/', asyncWrapper(async (req, res) => {
    try {
      // Proses data yang diterima, misalnya menyimpannya ke database
        const {queryString} = req.body
        const queryResult = await query(queryString)
        res.json({ message: 'Berhasil mengquery', result: queryResult });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.toString() });
    }
  }));
  router.post('/schedule-email', asyncWrapper(async (req, res) => {

   
    try {

        const {id, taskType, text, subject} = req.body
        if(taskType == 'NOTIFY'){
          await sendNotificationEmail(id)
        }
        else if(taskType == 'INFO'){
          await sendInformationEmail(id, text, subject)
        }
        res.json({ message: 'Berhasil mengquery'});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.toString() });
    }
  }));
export default router
