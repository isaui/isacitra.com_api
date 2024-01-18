// query from "./query"
import pkg from 'pg';

//import { Pool } from "pg";
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'viaduct.proxy.rlwy.net',
    database: 'railway',
    password: 'cA3BFCc4g2BGdCE15Fg3fG*112A5-b4-',
    port: 29766, // Port default PostgreSQL
  });
  const query = async (queryString) => {
    const client =  await pool.connect();
    const res = await client.query(queryString);
    client.release()
    return res
 }
 
const str = 
`
CREATE TABLE DEMO_EVENT(
    demoEventId UUID NOT NULL,
    title VARCHAR(50) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    PRIMARY KEY(demoEventId),
    isActive BOOLEAN DEFAULT true
);

CREATE TABLE DEMO_SESSIONS_DATE(
    demoEventId UUID NOT NULL,
    demoSessionDateId UUID NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY(demoSessionDateId),
    UNIQUE (demoSessionDateId, date),
    FOREIGN KEY(demoEventId) REFERENCES DEMO_EVENT(demoEventId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE DEMO_SESSION(
    demoSessionDateId UUID NOT NULL,
    demoSessionId UUID NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    PRIMARY KEY(demoSessionId),
    FOREIGN KEY(demoSessionDateId) REFERENCES DEMO_SESSIONS_DATE(demoSessionDateId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE BOOKING_DEMO(
    bookingDemoId UUID NOT NULL,
    demoSessionId UUID NOT NULL,
    nomorMahasiswa VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL, 
    PRIMARY KEY(BookingDemoId),
    FOREIGN KEY(demoSessionId) REFERENCES DEMO_SESSION(demoSessionId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION addBookingDemo() RETURNS TRIGGER AS
$$
BEGIN
IF(EXISTS(SELECT 1 FROM BOOKING_DEMO WHERE BOOKING_DEMO.demoSessionId = NEW.demoSessionId AND BOOKING_DEMO.status = 'active'))
THEN RAISE NOTICE 'Data dengan demoSessionId % dan status = ''active'' sudah ada, penyisipan dibatalkan.', NEW.demoSessionId;
ELSE
RETURN NEW; 
END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_addBookingDemo
BEFORE INSERT ON BOOKING_DEMO
FOR EACH ROW
EXECUTE FUNCTION addBookingDemo();
`
const str3 = `
CREATE OR REPLACE FUNCTION addBookingDemo() RETURNS TRIGGER AS
$$
BEGIN
IF(EXISTS(SELECT 1 FROM BOOKING_DEMO WHERE BOOKING_DEMO.demoSessionId = NEW.demoSessionId AND BOOKING_DEMO.status = 'active'))
THEN RAISE EXCEPTION 'Data dengan demoSessionId % dan status = ''active'' sudah ada, penyisipan dibatalkan.', NEW.demoSessionId;
RETURN NULL;
ELSE
RETURN NEW; 
END IF;
END;
$$ LANGUAGE plpgsql;
`

const str4 = `
ALTER TABLE BOOKING_DEMO
ADD COLUMN email VARCHAR(50);
`

const str5 = `
ALTER TABLE DEMO_EVENT
ADD COLUMN email VARCHAR(255) DEFAULT 'isacitralearning@gmail.com';
ALTER TABLE BOOKING_DEMO
ALTER COLUMN email SET DATA TYPE VARCHAR(255);
`


const str2 = `
CREATE TABLE DEMO_SESSION(
    demoSessionDateId UUID NOT NULL,
    demoSessionId UUID NOT NULL,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    PRIMARY KEY(demoSessionId),
    FOREIGN KEY(demoSessionDateId) REFERENCES DEMO_SESSIONS_DATE(demoSessionDateId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE BOOKING_DEMO(
    bookingDemoId UUID NOT NULL,
    demoSessionId UUID NOT NULL,
    nomorMahasiswa VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL, 
    PRIMARY KEY(BookingDemoId),
    FOREIGN KEY(demoSessionId) REFERENCES DEMO_SESSION(demoSessionId) ON UPDATE CASCADE ON DELETE CASCADE
);

`

const doSomething = async () => {
    try {
        console.log('BADUT')
        const res = await query(str5);
        console.log(res)
        console.log('Skrip berhasil dijalankan.');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}
doSomething();