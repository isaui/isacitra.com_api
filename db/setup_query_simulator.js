import pkg from 'pg';
const { Pool } = pkg;

const querySimulatorPool = new Pool({
    user: 'postgres',
      host: 'roundhouse.proxy.rlwy.net',
      database: 'railway',
      password: 'HEvekUnLqicOFrCLhuOzSYrRfHAuKxGQ',
      port: 24902
})

const query = async (queryString) => {
    const client =  await querySimulatorPool.connect();
    const res = await client.query(queryString);
    client.release()
    return res
 }



const schema = `
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.26
-- Dumped by pg_dump version 11.20 (Debian 11.20-0+deb10u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sistel; Type: SCHEMA; Schema: -; Owner: db2304
--
-- CREATE ROLE db2304;

CREATE SCHEMA sistel;


-- ALTER SCHEMA sistel OWNER TO db2304;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: admin; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.admin (
    email character varying(50) NOT NULL
);


-- ALTER TABLE sistel.admin OWNER TO db2304;

--
-- Name: complaints; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.complaints (
    id character varying(50) NOT NULL,
    cust_email character varying(50) NOT NULL,
    rv_id character varying(50) NOT NULL,
    complaint text NOT NULL
);


-- ALTER TABLE sistel.complaints OWNER TO db2304;

--
-- Name: customer; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.customer (
    email character varying(50) NOT NULL,
    nik character varying(20) NOT NULL
);


-- ALTER TABLE sistel.customer OWNER TO db2304;

--
-- Name: debit; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.debit (
    no_rekening character varying(20) NOT NULL,
    payment_id character varying(25) NOT NULL
);


-- ALTER TABLE sistel.debit OWNER TO db2304;

-- Name: driver; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.driver (
    phonenum character varying(20) NOT NULL,
    driver_name character varying(50) NOT NULL
);


-- ALTER TABLE sistel.driver OWNER TO db2304;

--
-- Name: ewallet; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.ewallet (
    phone_num character varying(20) NOT NULL,
    payment_id character varying(25) NOT NULL
);


-- ALTER TABLE sistel.ewallet OWNER TO db2304;

--
-- Name: holiday_promo; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.holiday_promo (
    id character varying(25) NOT NULL,
    range character varying NOT NULL
);


-- ALTER TABLE sistel.holiday_promo OWNER TO db2304;

-- Name: hotel; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.hotel (
    email character varying(50),
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL,
    nib character varying(20) NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    star double precision NOT NULL,
    street character varying(30) NOT NULL,
    district character varying(20) NOT NULL,
    city character varying(20) NOT NULL,
    province character varying(20) NOT NULL,
    description text NOT NULL,
    max_checkout time without time zone,
    min_checkout time without time zone,
    CONSTRAINT hotel_rating_check CHECK (((rating >= 0) AND (rating <= 10))),
    CONSTRAINT hotel_star_check CHECK (((star >= (1)::double precision) AND (star <= (5)::double precision)))
);


-- ALTER TABLE sistel.hotel OWNER TO db2304;

--
-- Name: hotel_facilities; Type: TABLE; Schema: sistel; Owner: db2304
--





-- OITSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
CREATE TABLE sistel.hotel_facilities (
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL,
    facility_name character varying(50) NOT NULL
);


-- ALTER TABLE sistel.hotel_facilities OWNER TO db2304;

--
-- Name: hotel_gives_promo; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.hotel_gives_promo (
    hotel_name character varying(50),
    hotel_branch character varying(50),
    promo_id character varying(25) NOT NULL
);


-- ALTER TABLE sistel.hotel_gives_promo OWNER TO db2304;

--
-- Name: hotel_nearbyplaces; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.hotel_nearbyplaces (
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL,
    place_name character varying(50) NOT NULL,
    distance double precision NOT NULL
);


-- ALTER TABLE sistel.hotel_nearbyplaces OWNER TO db2304;

--
-- Name: kredit; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.kredit (
    no_kartu character varying(20) NOT NULL,
    payment_id character varying(25) NOT NULL
);


-- ALTER TABLE sistel.kredit OWNER TO db2304;

--
-- Name: payment; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.payment (
    payment_id character varying(25) NOT NULL,
    status character varying(50) NOT NULL
);


-- ALTER TABLE sistel.payment OWNER TO db2304;

--
-- Name: promo; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.promo (
    id character varying(25) NOT NULL,
    description character varying(50) NOT NULL,
    discount integer NOT NULL,
    CONSTRAINT promo_discount_check CHECK (((discount >= 1) AND (discount <= 100)))
);


-- ALTER TABLE sistel.promo OWNER TO db2304;

--
-- Name: reservation; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation (
    rid character varying(50) NOT NULL,
    total_price double precision NOT NULL,
    checkin timestamp without time zone NOT NULL,
    checkout timestamp without time zone NOT NULL,
    payment character varying(25) NOT NULL,
    cust_email character varying(50)
);


-- ALTER TABLE sistel.reservation OWNER TO db2304;

--
-- Name: reservation_actor; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_actor (
    email character varying(50) NOT NULL,
    phonenum character varying(20) NOT NULL,
    admin_email character varying(50)
);


-- -- ALTER TABLE sistel.reservation_actor OWNER TO db2304;

--
-- Name: reservation_room; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_room (
    rsv_id character varying(50) NOT NULL,
    rnum character varying(30) NOT NULL,
    rhotelname character varying(50) NOT NULL,
    rhotelbranch character varying(50) NOT NULL,
    datetime date NOT NULL,
    isactive boolean NOT NULL
);


-- ALTER TABLE sistel.reservation_room OWNER TO db2304;

--
-- Name: reservation_shuttleservice; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_shuttleservice (
    rsv_id character varying(50) NOT NULL,
    vehicle_num character varying(10) NOT NULL,
    driver_phonenum character varying(20) NOT NULL,
    datetime date NOT NULL,
    isactive boolean NOT NULL
);


-- ALTER TABLE sistel.reservation_shuttleservice OWNER TO db2304;

--
-- Name: reservation_status; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_status (
    id character varying(20) NOT NULL,
    status character varying(50) NOT NULL
);


-- ALTER TABLE sistel.reservation_status OWNER TO db2304;

--
-- Name: reservation_status_history; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_status_history (
    rid character varying(50) NOT NULL,
    rsid character varying(20) NOT NULL,
    datetime timestamp without time zone NOT NULL
);


-- ALTER TABLE sistel.reservation_status_history OWNER TO db2304;

--
-- Name: reservation_use_promo; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reservation_use_promo (
    rid character varying(50) NOT NULL,
    pid character varying(25)
);


-- ALTER TABLE sistel.reservation_use_promo OWNER TO db2304;

--
-- Name: reviews; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.reviews (
    id character varying(50) NOT NULL,
    cust_email character varying(50) NOT NULL,
    rating integer NOT NULL,
    review text NOT NULL,
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL
);


-- ALTER TABLE sistel.reviews OWNER TO db2304;

--
-- Name: room; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.room (
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL,
    number character varying(30) NOT NULL,
    price bigint NOT NULL,
    floor integer NOT NULL
);


-- ALTER TABLE sistel.room OWNER TO db2304;

--
-- Name: room_facilities; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.room_facilities (
    hotel_name character varying(50) NOT NULL,
    hotel_branch character varying(50) NOT NULL,
    rnum character varying(30) NOT NULL,
    id character varying(20) NOT NULL,
    distance double precision NOT NULL
);


-- ALTER TABLE sistel.room_facilities OWNER TO db2304;

--
-- Name: shuttle_driver; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.shuttle_driver (
    "Payment_id" text,
    "Phone_num" numeric(12,1)
);


-- ALTER TABLE sistel.shuttle_driver OWNER TO db2304;

--
-- Name: shuttle_services; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.shuttle_services (
    driver_phonenum character varying(20) NOT NULL,
    vehicle_platnum character varying(10) NOT NULL
);


-- ALTER TABLE sistel.shuttle_services OWNER TO db2304;

--
-- Name: special_day_promo; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.special_day_promo (
    id character varying(25) NOT NULL,
    date date NOT NULL
);


-- ALTER TABLE sistel.special_day_promo OWNER TO db2304;

--
-- Name: user; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel."user" (
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    fname character varying(50) NOT NULL,
    lname character varying(50) NOT NULL
);


-- ALTER TABLE sistel."user" OWNER TO db2304;

--
-- Name: vehicle; Type: TABLE; Schema: sistel; Owner: db2304
--

CREATE TABLE sistel.vehicle (
    platnum character varying(10) NOT NULL,
    vehicle_brand character varying(50) NOT NULL,
    vehicle_type character varying(50) NOT NULL
);


-- ALTER TABLE sistel.vehicle OWNER TO db2304;

--
-- Data for Name: admin; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

--COPY sistel.admin (email) FROM stdin;
--mbowle19@geocities.com
--bpainten1a@cafepress.com
--rbarok1b@dot.gov
--kbirkhead1c@tiny.cc
--bcroose1d@sourceforge.net
--\.

INSERT INTO sistel.admin (email) VALUES
('mbowle19@geocities.com'),
('bpainten1a@cafepress.com'),
('rbarok1b@dot.gov'),
('kbirkhead1c@tiny.cc'),
('bcroose1d@sourceforge.net');



--
-- Data for Name: complaints; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.complaints (id, cust_email, rv_id, complaint) FROM stdin;
C01     igillum0@wix.com        UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB      Kamar tidak bersih setelah pembersihan yang dilakukan kemarin
C02     gkernan1@devhub.com     hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA      AC tidak berfungsi dan mengeluarkan suara bising
C03     hmcausland2@photobucket.com     QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      Koneksi Wi-Fi sangat lambat, sulit untuk digunakan
C04     jcobb3@godaddy.com      4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9      Tidak ada remote TV di dalam kamar
C05     vrebichon4@is.gd        svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ      Shower bocor dan mengakibatkan air tumpah ke lantai
C06     bbye5@tripadvisor.com   A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4      Sarapan pagi tidak sesuai dengan yang dipesan
C07     scassely6@hexun.com     op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      Pemandangan dari kamar tidak sesuai dengan yang dijanjikan
C08     jfoulgham7@delicious.com        J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv      Pelayanan pelanggan sangat lambat dan tidak responsif
C09     cklaiser8@wikipedia.org XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz      Kebersihan kolam renang kurang terjaga dan perlu dibersihkan
C10     afigger9@odnoklassniki.ru       59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM      Bau tidak sedap dari wastafel di kamar mandi
\.
*/

INSERT INTO sistel.complaints (id, cust_email, rv_id, complaint) VALUES
('C01', 'igillum0@wix.com', 'UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB', 'Kamar tidak bersih setelah pembersihan yang dilakukan kemarin'),
('C02', 'gkernan1@devhub.com', 'hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA', 'AC tidak berfungsi dan mengeluarkan suara bising'),
('C03', 'hmcausland2@photobucket.com', 'QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 'Koneksi Wi-Fi sangat lambat, sulit untuk digunakan'),
('C04', 'jcobb3@godaddy.com', '4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9', 'Tidak ada remote TV di dalam kamar'),
('C05', 'vrebichon4@is.gd', 'svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ', 'Shower bocor dan mengakibatkan air tumpah ke lantai'),
('C06', 'bbye5@tripadvisor.com', 'A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4', 'Sarapan pagi tidak sesuai dengan yang dipesan'),
('C07', 'scassely6@hexun.com', 'op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 'Pemandangan dari kamar tidak sesuai dengan yang dijanjikan'),
('C08', 'jfoulgham7@delicious.com', 'J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv', 'Pelayanan pelanggan sangat lambat dan tidak responsif'),
('C09', 'cklaiser8@wikipedia.org', 'XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz', 'Kebersihan kolam renang kurang terjaga dan perlu dibersihkan'),
('C10', 'afigger9@odnoklassniki.ru', '59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM', 'Bau tidak sedap dari wastafel di kamar mandi')
;


--
-- Data for Name: customer; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.customer (email, nik) FROM stdin;
igillum0@wix.com        2866010744
gkernan1@devhub.com     5132469090
hmcausland2@photobucket.com     7686387864
jcobb3@godaddy.com      5163377766
vrebichon4@is.gd        5953020092
bbye5@tripadvisor.com   8977765396
scassely6@hexun.com     4006950898
jfoulgham7@delicious.com        8986032960
cklaiser8@wikipedia.org 7957756351
afigger9@odnoklassniki.ru       7837900060
agrinta@jigsy.com       4648219429
jmanchesterb@sciencedaily.com   4261105845
hlettucec@wiley.com     6132596025
cmcasparand@comcast.net 3964857731
rgeraldeze@timesonline.co.uk    6805230523
jmurrisonf@weibo.com    1057677724
sstocking@comcast.net   6143741534
ffearnallh@dyndns.org   5788052604
kdrayei@mozilla.org     7915982460
tzimaj@china.com.cn     6614376044
mgrimsterk@unicef.org   4191058956
bengehaml@sohu.com      4728029626
rmacgibbonm@icq.com     3827991186
csheabern@about.com     2848182460
enibleyo@bizjournals.com        9682290497
eslavinp@opensource.org 6493880592
rbillsq@amazon.co.jp    9163758680
spalffyr@nytimes.com    8245759157
abloodworthes@cnn.com   8371602881
rbrooksont@barnesandnoble.com   3519174630
elewzeyu@epa.gov        1008998142
swhiteselv@indiatimes.com       4576381917
slagnew@craigslist.org  6916275446
fdampierx@opensource.org        2984591896
abarlassy@histats.com   5011909436
\.
*/

INSERT INTO sistel.customer (email, nik) VALUES
('igillum0@wix.com', '2866010744'),
('gkernan1@devhub.com', '5132469090'),
('hmcausland2@photobucket.com', '7686387864'),
('jcobb3@godaddy.com', '5163377766'),
('vrebichon4@is.gd', '5953020092'),
('bbye5@tripadvisor.com', '8977765396'),
('scassely6@hexun.com', '4006950898'),
('jfoulgham7@delicious.com', '8986032960'),
('cklaiser8@wikipedia.org', '7957756351'),
('afigger9@odnoklassniki.ru', '7837900060'),
('agrinta@jigsy.com', '4648219429'),
('jmanchesterb@sciencedaily.com', '4261105845'),
('hlettucec@wiley.com', '6132596025'),
('cmcasparand@comcast.net', '3964857731'),
('rgeraldeze@timesonline.co.uk', '6805230523'),
('jmurrisonf@weibo.com', '1057677724'),
('sstocking@comcast.net', '6143741534'),
('ffearnallh@dyndns.org', '5788052604'),
('kdrayei@mozilla.org', '7915982460'),
('tzimaj@china.com.cn', '6614376044'),
('mgrimsterk@unicef.org', '4191058956'),
('bengehaml@sohu.com', '4728029626'),
('rmacgibbonm@icq.com', '3827991186'),
('csheabern@about.com', '2848182460'),
('enibleyo@bizjournals.com', '9682290497'),
('eslavinp@opensource.org', '6493880592'),
('rbillsq@amazon.co.jp', '9163758680'),
('spalffyr@nytimes.com', '8245759157'),
('abloodworthes@cnn.com', '8371602881'),
('rbrooksont@barnesandnoble.com', '3519174630'),
('elewzeyu@epa.gov', '1008998142'),
('swhiteselv@indiatimes.com', '4576381917'),
('slagnew@craigslist.org', '6916275446'),
('fdampierx@opensource.org', '2984591896'),
('abarlassy@histats.com', '5011909436')
;


--
-- Data for Name: debit; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.debit (no_rekening, payment_id) FROM stdin;
864-41-2178     787-30-7976
194-16-0607     633-46-7062
831-43-8533     619-97-7864
423-11-3720     853-93-4352
237-54-1339     154-99-3394
\.
*/
INSERT INTO sistel.debit (no_rekening, payment_id) VALUES
('864-41-2178', '787-30-7976'),
('194-16-0607', '633-46-7062'),
('831-43-8533', '619-97-7864'),
('423-11-3720', '853-93-4352'),
('237-54-1339', '154-99-3394')
;



--
-- Data for Name: driver; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.driver (phonenum, driver_name) FROM stdin;
PhoneNum        Driver_name
3339151508.0    Wendell Gormally
3359407108.0    Hardy Jelf
8966759552.0    Steve Zanussii
6865417979.0    Theodore Chasmor
3405987596.0    Marcelle Demsey
\.
*/
INSERT INTO sistel.driver (phonenum, driver_name) VALUES
('3339151508.0', 'Wendell Gormally'),
('3359407108.0', 'Hardy Jelf'),
('8966759552.0', 'Steve Zanussii'),
('6865417979.0', 'Theodore Chasmor'),
('3405987596.0', 'Marcelle Demsey')
;


--
-- Data for Name: ewallet; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.ewallet (phone_num, payment_id) FROM stdin;
83524776473     772-98-9032
89887675743     581-49-0243
85243613416     352-24-9420
82636153679     839-50-0348
82742641672     740-71-8191
\.
*/
INSERT INTO sistel.ewallet (phone_num, payment_id) VALUES
('83524776473', '772-98-9032'),
('89887675743', '581-49-0243'),
('85243613416', '352-24-9420'),
('82636153679', '839-50-0348'),
('82742641672', '740-71-8191')
;



--
-- Data for Name: holiday_promo; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.holiday_promo (id, range) FROM stdin;
2Q3rStUvWx4Y5zAB6C7     07-10 to 07-10
D8eFgH9IjK1LmNoPqR      21-08 to 28-09
R3S0tUvW1XyZ2aBcDeF     26-08 to 26-08
hIjK4LmNoP6Q7R8sTuV     01-07 to 27-09
vW0xYzABcD1E3F5gHiJ     26-10 to 26-11
JkLmNoPqR2S3tUvW4X      01-05 to 23-07
yZaBcDe5FgH6IjK8Lm      25-03 to 26-04
NoPqR9S0tU1vW2xYzA      06-05 to 07-07
3BcDe5F7gHi8JkLmNo      12-04 to 23-04
1PqR2S3tUvW4xYzAB       06-02 to 16-03
\.
*/

INSERT INTO sistel.holiday_promo (id, range) VALUES
('2Q3rStUvWx4Y5zAB6C7', '07-10 to 07-10'),
('D8eFgH9IjK1LmNoPqR', '21-08 to 28-09'),
('R3S0tUvW1XyZ2aBcDeF', '26-08 to 26-08'),
('hIjK4LmNoP6Q7R8sTuV', '01-07 to 27-09'),
('vW0xYzABcD1E3F5gHiJ', '26-10 to 26-11'),
('JkLmNoPqR2S3tUvW4X', '01-05 to 23-07'),
('yZaBcDe5FgH6IjK8Lm', '25-03 to 26-04'),
('NoPqR9S0tU1vW2xYzA', '06-05 to 07-07'),
('3BcDe5F7gHi8JkLmNo', '12-04 to 23-04'),
('1PqR2S3tUvW4xYzAB', '06-02 to 16-03')
;



--
-- Data for Name: hotel; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.hotel (email, hotel_name, hotel_branch, nib, rating, star, street, district, city, province, description, max_checkout, min_checkout) FROM stdin;
pwoolgerz@behance.net   Grand Hotel     Ski Resort      8638742711987.0 3      1.30000000000000004      68975 Stephen Terrace   Business Sector Jakarta DKI Jakarta     sebuah hotel    13:59:59        11:59:59
ttitterrell10@exblog.jp Sunset Resort   Business District       1048597951156.071.89999999999999991     548 Portage Pass        Tropical Paradise       SurabayaJawa Timur      sebuah hotel    13:59:59        11:59:59
cwoollin11@domainmarket.com     Royal Palace    Mountain Lodge  6778402627432.032.79999999999999982     94 Superior Hill        Forest Haven    Bandung Jawa Barat      sebuah hotel    13:59:59        11:59:59
ufearnyhough12@digg.com Ocean View Inn  City Center     5476071749258.0 10     3.10000000000000009      57 Sage Parkway Beachside Sector        Medan   Sumatera Utara  sebuah hotel    13:59:59        11:59:59
ttottle13@utexas.edu    Mountain Retreat        Lakeside Retreat        7433535926257.0 0       4.29999999999999982     77 Sycamore Terrace     Business SectorSemarang Jawa Tengah     sebuah hotel    13:59:59        11:59:59
trosenhaupt14@businesswire.com  Golden Sands Hotel      Urban Oasis     7648478364220.0 2       3.60000000000000009     7 Commercial Trail      Historic Downtown       Makassar        Sulawesi Selatan        sebuah hotel    13:59:59       11:59:59
abrasier15@e-recht24.de Harbor View Lodge       Business District       9674545993610.0 5       1.69999999999999996     17 Chive Drive  Island Paradise Yogyakarta      DIY     sebuah hotel    13:59:59        11:59:59
imacmichael16@hud.gov   Palm Paradise Resort    Mountain Lodge  1689485245278.083.20000000000000018     01478 Iowa Road Countryside Area        Palembang      Sumatera Selatan sebuah hotel    13:59:59        11:59:59
lgresty17@zimbio.com    Silver Star Hotel       Beach Resort    7811501784964.021.69999999999999996     5765 Express Circle     Historic Downtown       Malang Jawa Timur       sebuah hotel    13:59:59        11:59:59
dmatuszkiewicz18@whitehouse.gov Lakeside Manor  Historic Downtown       6072148971768.0 1       4.29999999999999982     35535 Schiller Terrace  Lakeside Area  Tangerang        Banten  sebuah hotel    13:59:59        11:59:59
\.
*/

INSERT INTO sistel.hotel (email, hotel_name, hotel_branch, nib, rating, star, street, district, city, province, description, max_checkout, min_checkout) VALUES
('pwoolgerz@behance.net', 'Grand Hotel', 'Ski Resort', '8638742711987.0', '3', '1.3', '68975 Stephen Terrace', 'Business Sector', 'Jakarta', 'DKI Jakarta', 'sebuah hotel', '13:59:59', '11:59:59'),
('ttitterrell10@exblog.jp', 'Sunset Resort', 'Business District', '1048597951156.0', '7','1.9', '548 Portage Pass', 'Tropical Paradise', 'Surabaya', 'Jawa Timur', 'sebuah hotel', '13:59:59', '11:59:59'),
('cwoollin11@domainmarket.com', 'Royal Palace', 'Mountain Lodge', '6778402627432.0', '3','2.8', '94 Superior Hill', 'Forest Haven', 'Bandung', 'Jawa Barat', 'sebuah hotel', '13:59:59', '11:59:59'),
('ufearnyhough12@digg.com', 'Ocean View Inn', 'City Center', '5476071749258.0', '10', '3.1', '57 Sage Parkway', 'Beachside Sector', 'Medan', 'Sumatera Utara', 'sebuah hotel', '13:59:59', '11:59:59'),
('ttottle13@utexas.edu', 'Mountain Retreat', 'Lakeside Retreat', '7433535926257.0', '0', '4.3', '77 Sycamore Terrace', 'Business Sector', 'Semarang', 'Jawa Tengah', 'sebuah hotel', '13:59:59', '11:59:59'),
('trosenhaupt14@businesswire.com', 'Golden Sands Hotel', 'Urban Oasis', '7648478364220.0', '2', '3.6', '7 Commercial Trail', 'Historic Downtown', 'Makassar', 'Sulawesi Selatan', 'sebuah hotel', '13:59:59', '11:59:59'),
('abrasier15@e-recht24.de', 'Harbor View Lodge', 'Business District', '9674545993610.0', '5', '1.7', '17 Chive Drive', 'Island Paradise', 'Yogyakarta', 'DIY', 'sebuah hotel', '13:59:59', '11:59:59'),
('imacmichael16@hud.gov', 'Palm Paradise Resort', 'Mountain Lodge', '1689485245278.0', '8','3.2', '01478 Iowa Road', 'Countryside Area', 'Palembang', 'Sumatera Selatan', 'sebuah hotel', '13:59:59', '11:59:59'),
('lgresty17@zimbio.com', 'Silver Star Hotel', 'Beach Resort', '7811501784964.0', '2','1.7', '5765 Express Circle', 'Historic Downtown', 'Malang', 'Jawa Timur', 'sebuah hotel', '13:59:59', '11:59:59'),
('dmatuszkiewicz18@whitehouse.gov', 'Lakeside Manor', 'Historic Downtown', '6072148971768.0', '1', '4.3', '35535 Schiller Terrace', 'Lakeside Area', 'Tangerang', 'Banten', 'sebuah hotel', '13:59:59', '11:59:59')
;



--
-- Data for Name: hotel_facilities; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.hotel_facilities (hotel_name, hotel_branch, facility_name) FROM stdin;
Grand Hotel     Ski Resort      Swimming Pool
Sunset Resort   Business District       Fitness Center
Royal Palace    Mountain Lodge  Restaurant
Ocean View Inn  City Center     Spa & Beauty Center
Mountain Retreat        Lakeside Retreat        Lounge Bar
Golden Sands Hotel      Urban Oasis     Conference Room
Harbor View Lodge       Business District       24-Hour Room Service
Palm Paradise Resort    Mountain Lodge  Free Parking
Silver Star Hotel       Beach Resort    Bike Rental Service
Lakeside Manor  Historic Downtown       Laundry Service
Grand Hotel     Ski Resort      Free Wi-Fi Access
Sunset Resort   Business District       Airport Shuttle Service
Royal Palace    Mountain Lodge  Swimming Pool
Ocean View Inn  City Center     Fitness Center
Mountain Retreat        Lakeside Retreat        Restaurant
Golden Sands Hotel      Urban Oasis     Spa & Beauty Center
Harbor View Lodge       Business District       Lounge Bar
Palm Paradise Resort    Mountain Lodge  Conference Room
Silver Star Hotel       Beach Resort    24-Hour Room Service
Lakeside Manor  Historic Downtown       Free Parking
Grand Hotel     Ski Resort      Bike Rental Service
Sunset Resort   Business District       Laundry Service
Royal Palace    Mountain Lodge  Free Wi-Fi Access
Ocean View Inn  City Center     Airport Shuttle Service
Mountain Retreat        Lakeside Retreat        Swimming Pool
Golden Sands Hotel      Urban Oasis     Fitness Center
Harbor View Lodge       Business District       Restaurant
Palm Paradise Resort    Mountain Lodge  Spa & Beauty Center
Silver Star Hotel       Beach Resort    Lounge Bar
Lakeside Manor  Historic Downtown       Conference Room
\.
*/
INSERT INTO sistel.hotel_facilities (hotel_name, hotel_branch, facility_name) VALUES
('Grand Hotel', 'Ski Resort', 'Swimming Pool'),
('Sunset Resort', 'Business District', 'Fitness Center'),
('Royal Palace', 'Mountain Lodge', 'Restaurant'),
('Ocean View Inn', 'City Center', 'Spa & Beauty Center'),
('Mountain Retreat', 'Lakeside Retreat', 'Lounge Bar'),
('Golden Sands Hotel', 'Urban Oasis', 'Conference Room'),
('Harbor View Lodge', 'Business District', '24-Hour Room Service'),
('Palm Paradise Resort', 'Mountain Lodge', 'Free Parking'),
('Silver Star Hotel', 'Beach Resort', 'Bike Rental Service'),
('Lakeside Manor', 'Historic Downtown', 'Laundry Service'),
('Grand Hotel', 'Ski Resort', 'Free Wi-Fi Access'),
('Sunset Resort', 'Business District', 'Airport Shuttle Service'),
('Royal Palace', 'Mountain Lodge', 'Swimming Pool'),
('Ocean View Inn', 'City Center', 'Fitness Center'),
('Mountain Retreat', 'Lakeside Retreat', 'Restaurant'),
('Golden Sands Hotel', 'Urban Oasis', 'Spa & Beauty Center'),
('Harbor View Lodge', 'Business District', 'Lounge Bar'),
('Palm Paradise Resort', 'Mountain Lodge', 'Conference Room'),
('Silver Star Hotel', 'Beach Resort', '24-Hour Room Service'),
('Lakeside Manor', 'Historic Downtown', 'Free Parking'),
('Grand Hotel', 'Ski Resort', 'Bike Rental Service'),
('Sunset Resort', 'Business District', 'Laundry Service'),
('Royal Palace', 'Mountain Lodge', 'Free Wi-Fi Access'),
('Ocean View Inn', 'City Center', 'Airport Shuttle Service'),
('Mountain Retreat', 'Lakeside Retreat', 'Swimming Pool'),
('Golden Sands Hotel', 'Urban Oasis', 'Fitness Center'),
('Harbor View Lodge', 'Business District', 'Restaurant'),
('Palm Paradise Resort', 'Mountain Lodge', 'Spa & Beauty Center'),
('Silver Star Hotel', 'Beach Resort', 'Lounge Bar'),
('Lakeside Manor', 'Historic Downtown', 'Conference Room')
;

--
-- Data for Name: hotel_gives_promo; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.hotel_gives_promo (hotel_name, hotel_branch, promo_id) FROM stdin;
Grand Hotel     Ski Resort      AB3cE2dF1gH5iJ7kL9mNoQpR
Sunset Resort   Business District       XyZaB8cDE3Fg4HiJ0Km1Np2
Royal Palace    Mountain Lodge  T2uVwY4zABcDe6FGhIj8Kl
Ocean View Inn  City Center     qRu5sTgH3iVjWk9LmNxY
Mountain Retreat        Lakeside Retreat        O7pQrS0tUvW1xYzAB2C3D
Golden Sands Hotel      Urban Oasis     V4E5FgHi6JkLmNoP7QsT
Harbor View Lodge       Business District       D8E0FgHiJ1K2L4M5NpQR
Palm Paradise Resort    Mountain Lodge  oS7T9vW0xYzABcDfGhIj
Silver Star Hotel       Beach Resort    2Kl3mNp5qRsTuVwXyZaBc
Lakeside Manor  Historic Downtown       uD1E4F5gHi6JkLmNoP
Grand Hotel     Ski Resort      2Q3rStUvWx4Y5zAB6C7
Sunset Resort   Business District       D8eFgH9IjK1LmNoPqR
Royal Palace    Mountain Lodge  R3S0tUvW1XyZ2aBcDeF
Ocean View Inn  City Center     hIjK4LmNoP6Q7R8sTuV
Mountain Retreat        Lakeside Retreat        vW0xYzABcD1E3F5gHiJ
Golden Sands Hotel      Urban Oasis     JkLmNoPqR2S3tUvW4X
Harbor View Lodge       Business District       yZaBcDe5FgH6IjK8Lm
Palm Paradise Resort    Mountain Lodge  NoPqR9S0tU1vW2xYzA
Silver Star Hotel       Beach Resort    3BcDe5F7gHi8JkLmNo
Lakeside Manor  Historic Downtown       1PqR2S3tUvW4xYzAB
Grand Hotel     Ski Resort      D7eFgH9IjK1LmNoPqR
Sunset Resort   Business District       3BcDA5F7gHi8JkLmNo
Royal Palace    Mountain Lodge  NbPqR9S0tU1vW2xYzA
Ocean View Inn  City Center     uD7E4F5gHi6JkLmNoP
Mountain Retreat        Lakeside Retreat        yXaBcDe5FgH6IjK8Lm
\.
*/

INSERT INTO sistel.hotel_gives_promo (hotel_name, hotel_branch, promo_id) VALUES
('Grand Hotel', 'Ski Resort', 'AB3cE2dF1gH5iJ7kL9mNoQpR'),
('Sunset Resort', 'Business District', 'XyZaB8cDE3Fg4HiJ0Km1Np2'),
('Royal Palace', 'Mountain Lodge', 'T2uVwY4zABcDe6FGhIj8Kl'),
('Ocean View Inn', 'City Center', 'qRu5sTgH3iVjWk9LmNxY'),
('Mountain Retreat', 'Lakeside Retreat', 'O7pQrS0tUvW1xYzAB2C3D'),
('Golden Sands Hotel', 'Urban Oasis', 'V4E5FgHi6JkLmNoP7QsT'),
('Harbor View Lodge', 'Business District', 'D8E0FgHiJ1K2L4M5NpQR'),
('Palm Paradise Resort', 'Mountain Lodge', 'oS7T9vW0xYzABcDfGhIj'),
('Silver Star Hotel', 'Beach Resort', '2Kl3mNp5qRsTuVwXyZaBc'),
('Lakeside Manor', 'Historic Downtown', 'uD1E4F5gHi6JkLmNoP'),
('Grand Hotel', 'Ski Resort', '2Q3rStUvWx4Y5zAB6C7'),
('Sunset Resort', 'Business District', 'D8eFgH9IjK1LmNoPqR'),
('Royal Palace', 'Mountain Lodge', 'R3S0tUvW1XyZ2aBcDeF'),
('Ocean View Inn', 'City Center', 'hIjK4LmNoP6Q7R8sTuV'),
('Mountain Retreat', 'Lakeside Retreat', 'vW0xYzABcD1E3F5gHiJ'),
('Golden Sands Hotel', 'Urban Oasis', 'JkLmNoPqR2S3tUvW4X'),
('Harbor View Lodge', 'Business District', 'yZaBcDe5FgH6IjK8Lm'),
('Palm Paradise Resort', 'Mountain Lodge', 'NoPqR9S0tU1vW2xYzA'),
('Silver Star Hotel', 'Beach Resort', '3BcDe5F7gHi8JkLmNo'),
('Lakeside Manor', 'Historic Downtown', '1PqR2S3tUvW4xYzAB'),
('Grand Hotel', 'Ski Resort', 'D7eFgH9IjK1LmNoPqR'),
('Sunset Resort', 'Business District', '3BcDA5F7gHi8JkLmNo'),
('Royal Palace', 'Mountain Lodge', 'NbPqR9S0tU1vW2xYzA'),
('Ocean View Inn', 'City Center', 'uD7E4F5gHi6JkLmNoP'),
('Mountain Retreat', 'Lakeside Retreat', 'yXaBcDe5FgH6IjK8Lm')
;


--
-- Data for Name: hotel_nearbyplaces; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.hotel_nearbyplaces (hotel_name, hotel_branch, place_name, distance) FROM stdin;
Grand Hotel     Ski Resort      Pinecrest Park  0.969999999999999973
Sunset Resort   Business District       Meadowbrook Park        4.41000000000000014
Royal Palace    Mountain Lodge  Hillside Park   1.62000000000000011
Ocean View Inn  City Center     Hillcrest Community Center      3.79999999999999982
Mountain Retreat        Lakeside Retreat        Pinecrest Park  0.800000000000000044
Golden Sands Hotel      Urban Oasis     Hillcrest Community Center      4.37999999999999989
Harbor View Lodge       Business District       Hawthorn Art Gallery    2.20999999999999996
Palm Paradise Resort    Mountain Lodge  Meadowbrook Park        0.369999999999999996
Silver Star Hotel       Beach Resort    Meadowbrook Park        3.29999999999999982
Lakeside Manor  Historic Downtown       Willowbrook Rest Area   4.12999999999999989
Grand Hotel     Ski Resort      Glenview Park   3.83000000000000007
Sunset Resort   Business District       Hillside Park   4.49000000000000021
Royal Palace    Mountain Lodge  Meadowbrook Park        3.20999999999999996
Ocean View Inn  City Center     Meadowbrook Park        4.51999999999999957
Mountain Retreat        Lakeside Retreat        Willowbrook Rest Area   2.7799999999999998
Golden Sands Hotel      Urban Oasis     Hillcrest Community Center      0.419999999999999984
Harbor View Lodge       Business District       Pinecrest Park  2.62999999999999989
Palm Paradise Resort    Mountain Lodge  Pinecrest Park  4.26999999999999957
Silver Star Hotel       Beach Resort    Willowbrook Rest Area   4.88999999999999968
Lakeside Manor  Historic Downtown       Willowbrook Rest Area   1.90999999999999992
Grand Hotel     Ski Resort      Hillcrest Community Center      4.80999999999999961
Sunset Resort   Business District       Fairview Garden 2.06999999999999984
Royal Palace    Mountain Lodge  Cedarville Cafe 4.87999999999999989
Ocean View Inn  City Center     Pinecrest Park  0.320000000000000007
Mountain Retreat        Lakeside Retreat        Hawthorn Art Gallery    0.429999999999999993
Golden Sands Hotel      Urban Oasis     Cedarville Cafe 4.83999999999999986
Harbor View Lodge       Business District       Springfield Book Store  1.1399999999999999
Palm Paradise Resort    Mountain Lodge  Glenview Park   0.67000000000000004
Silver Star Hotel       Beach Resort    Sunnydale Beach Resort  0.800000000000000044
Lakeside Manor  Historic Downtown       Rosewood Cafe   0.640000000000000013
\.
*/
INSERT INTO sistel.hotel_nearbyplaces (hotel_name, hotel_branch, place_name, distance) VALUES
('Grand Hotel', 'Ski Resort', 'Pinecrest Park', 0.969999999999999973),
('Sunset Resort', 'Business District', 'Meadowbrook Park', 4.41000000000000014),
('Royal Palace', 'Mountain Lodge', 'Hillside Park', 1.62000000000000011),
('Ocean View Inn', 'City Center', 'Hillcrest Community Center', 3.79999999999999982),
('Mountain Retreat', 'Lakeside Retreat', 'Pinecrest Park', 0.800000000000000044),
('Golden Sands Hotel', 'Urban Oasis', 'Hillcrest Community Center', 4.37999999999999989),
('Harbor View Lodge', 'Business District', 'Hawthorn Art Gallery', 2.20999999999999996),
('Palm Paradise Resort', 'Mountain Lodge', 'Meadowbrook Park', 0.369999999999999996),
('Silver Star Hotel', 'Beach Resort', 'Meadowbrook Park', 3.29999999999999982),
('Lakeside Manor', 'Historic Downtown', 'Willowbrook Rest Area', 4.12999999999999989),
('Grand Hotel', 'Ski Resort', 'Glenview Park', 3.83000000000000007),
('Sunset Resort', 'Business District', 'Hillside Park', 4.49000000000000021),
('Royal Palace', 'Mountain Lodge', 'Meadowbrook Park', 3.20999999999999996),
('Ocean View Inn', 'City Center', 'Meadowbrook Park', 4.51999999999999957),
('Mountain Retreat', 'Lakeside Retreat', 'Willowbrook Rest Area', 2.7799999999999998),
('Golden Sands Hotel', 'Urban Oasis', 'Hillcrest Community Center', 0.419999999999999984),
('Harbor View Lodge', 'Business District', 'Pinecrest Park', 2.62999999999999989),
('Palm Paradise Resort', 'Mountain Lodge', 'Pinecrest Park', 4.26999999999999957),
('Silver Star Hotel', 'Beach Resort', 'Willowbrook Rest Area', 4.88999999999999968),
('Lakeside Manor', 'Historic Downtown', 'Willowbrook Rest Area', 1.90999999999999992),
('Grand Hotel', 'Ski Resort', 'Hillcrest Community Center', 4.80999999999999961),
('Sunset Resort', 'Business District', 'Fairview Garden', 2.06999999999999984),
('Royal Palace', 'Mountain Lodge', 'Cedarville Cafe', 4.87999999999999989),
('Ocean View Inn', 'City Center', 'Pinecrest Park', 0.320000000000000007),
('Mountain Retreat', 'Lakeside Retreat', 'Hawthorn Art Gallery', 0.429999999999999993),
('Golden Sands Hotel', 'Urban Oasis', 'Cedarville Cafe', 4.83999999999999986),
('Harbor View Lodge', 'Business District', 'Springfield Book Store', 1.1399999999999999),
('Palm Paradise Resort', 'Mountain Lodge', 'Glenview Park', 0.67000000000000004),
('Silver Star Hotel', 'Beach Resort', 'Sunnydale Beach Resort', 0.800000000000000044),
('Lakeside Manor', 'Historic Downtown', 'Rosewood Cafe', 0.640000000000000013)
;



--
-- Data for Name: kredit; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.kredit (no_kartu, payment_id) FROM stdin;
864-41-2178     787-30-7976
194-16-0607     633-46-7062
831-43-8533     619-97-7864
423-11-3720     853-93-4352
237-54-1339     154-99-3394
\.
*/

INSERT INTO sistel.kredit (no_kartu, payment_id) VALUES
('864-41-2178', '787-30-7976'),
('194-16-0607', '633-46-7062'),
('831-43-8533', '619-97-7864'),
('423-11-3720', '853-93-4352'),
('237-54-1339', '154-99-3394');


--
-- Data for Name: payment; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.payment (payment_id, status) FROM stdin;
772-98-9032     gagal
581-49-0243     pending
352-24-9420     pending
839-50-0348     pending
740-71-8191     gagal
787-30-7976     pending
633-46-7062     berhasil
619-97-7864     pending
853-93-4352     berhasil
154-99-3394     pending
394-38-1217     pending
496-06-2568     berhasil
471-60-3968     gagal
411-53-7708     pending
313-61-1383     gagal
104-88-8913     pending
137-93-1801     gagal
895-01-1253     gagal
509-25-1911     pending
390-37-5670     gagal
\.
*/

INSERT INTO sistel.payment (payment_id, status) VALUES
('772-98-9032', 'gagal'),
('581-49-0243', 'pending'),
('352-24-9420', 'pending'),
('839-50-0348', 'pending'),
('740-71-8191', 'gagal'),
('787-30-7976', 'pending'),
('633-46-7062', 'berhasil'),
('619-97-7864', 'pending'),
('853-93-4352', 'berhasil'),
('154-99-3394', 'pending'),
('394-38-1217', 'pending'),
('496-06-2568', 'berhasil'),
('471-60-3968', 'gagal'),
('411-53-7708', 'pending'),
('313-61-1383', 'gagal'),
('104-88-8913', 'pending'),
('137-93-1801', 'gagal'),
('895-01-1253', 'gagal'),
('509-25-1911', 'pending'),
('390-37-5670', 'gagal');


--
-- Data for Name: promo; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.promo (id, description, discount) FROM stdin;
AB3cE2dF1gH5iJ7kL9mNoQpR        50% Off Luxury Suites   57
XyZaB8cDE3Fg4HiJ0Km1Np2 Stay 3, Pay 2 Nights    38
T2uVwY4zABcDe6FGhIj8Kl  Weekend Getaway Special 26
qRu5sTgH3iVjWk9LmNxY    Honeymoon Paradise      63
O7pQrS0tUvW1xYzAB2C3D   Family Fun Package      18
V4E5FgHi6JkLmNoP7QsT    Beachfront Bliss        41
D8E0FgHiJ1K2L4M5NpQR    Romantic Retreat        68
oS7T9vW0xYzABcDfGhIj    Gourmet Dining Included 22
2Kl3mNp5qRsTuVwXyZaBc   Kids Stay Free  52
uD1E4F5gHi6JkLmNoP      Spa & Wellness Escape   34
2Q3rStUvWx4Y5zAB6C7     City Lights Deal        59
D8eFgH9IjK1LmNoPqR      Adventure Package       19
R3S0tUvW1XyZ2aBcDeF     Sunny Seaside Deal      60
hIjK4LmNoP6Q7R8sTuV     Business Travelers Discount     45
vW0xYzABcD1E3F5gHiJ     Historic Charm Offer    27
JkLmNoPqR2S3tUvW4X      Mountainside Hideaway   56
yZaBcDe5FgH6IjK8Lm      Last-Minute Special     49
NoPqR9S0tU1vW2xYzA      Pet-Friendly Getaway    30
3BcDe5F7gHi8JkLmNo      Couples' Paradise       67
1PqR2S3tUvW4xYzAB       Frequent Stayer Rewards 24
D7eFgH9IjK1LmNoPqR      Romantic escape with a candlelit dinner 61
3BcDA5F7gHi8JkLmNo      Group bookings: Discounted rates available      10
NbPqR9S0tU1vW2xYzA      Last-minute deals: Limited time offers  12
uD7E4F5gHi6JkLmNoP      Escape to the mountains with special discounts  14
yXaBcDe5FgH6IjK8Lm      Business traveler discounts with free Wi-Fi     25
\.
*/

INSERT INTO sistel.promo (id, description, discount) VALUES
('AB3cE2dF1gH5iJ7kL9mNoQpR', '50% Off Luxury Suites', 57),
('XyZaB8cDE3Fg4HiJ0Km1Np2', 'Stay 3, Pay 2 Nights', 38),
('T2uVwY4zABcDe6FGhIj8Kl', 'Weekend Getaway Special', 26),
('qRu5sTgH3iVjWk9LmNxY', 'Honeymoon Paradise', 63),
('O7pQrS0tUvW1xYzAB2C3D', 'Family Fun Package', 18),
('V4E5FgHi6JkLmNoP7QsT', 'Beachfront Bliss', 41),
('D8E0FgHiJ1K2L4M5NpQR', 'Romantic Retreat', 68),
('oS7T9vW0xYzABcDfGhIj', 'Gourmet Dining Included', 22),
('2Kl3mNp5qRsTuVwXyZaBc', 'Kids Stay Free', 52),
('uD1E4F5gHi6JkLmNoP', 'Spa & Wellness Escape', 34),
('2Q3rStUvWx4Y5zAB6C7', 'City Lights Deal', 59),
('D8eFgH9IjK1LmNoPqR', 'Adventure Package', 19),
('R3S0tUvW1XyZ2aBcDeF', 'Sunny Seaside Deal', 60),
('hIjK4LmNoP6Q7R8sTuV', 'Business Travelers Discount', 45),
('vW0xYzABcD1E3F5gHiJ', 'Historic Charm Offer', 27),
('JkLmNoPqR2S3tUvW4X', 'Mountainside Hideaway', 56),
('yZaBcDe5FgH6IjK8Lm', 'Last-Minute Special', 49),
('NoPqR9S0tU1vW2xYzA', 'Pet-Friendly Getaway', 30),
('3BcDe5F7gHi8JkLmNo', 'Couples'' Paradise', 67),
('1PqR2S3tUvW4xYzAB', 'Frequent Stayer Rewards', 24),
('D7eFgH9IjK1LmNoPqR', 'Romantic escape with a candlelit dinner', 61),
('3BcDA5F7gHi8JkLmNo', 'Group bookings: Discounted rates available', 10),
('NbPqR9S0tU1vW2xYzA', 'Last-minute deals: Limited time offers', 12),
('uD7E4F5gHi6JkLmNoP', 'Escape to the mountains with special discounts', 14),
('yXaBcDe5FgH6IjK8Lm', 'Business traveler discounts with free Wi-Fi', 25);


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: sistel; Owner: db2304
--


/*
COPY sistel.reservation (rid, total_price, checkin, checkout, payment, cust_email) FROM stdin;
UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB      5686765 2023-10-12 14:21:46     2023-10-17 18:32:12     772-98-9032     rbrooksont@barnesandnoble.com
hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA      4726800 2023-10-12 09:45:34     2023-10-15 10:56:00     581-49-0243     slagnew@craigslist.org
QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      7537507 2023-10-13 21:03:29     2023-10-16 03:13:55     352-24-9420     jmanchesterb@sciencedaily.com
4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9      4321111 2023-10-11 05:57:17     2023-10-16 21:07:43     839-50-0348     cmcasparand@comcast.net
svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ      3382717 2023-10-12 16:38:02     2023-10-14 08:48:28     740-71-8191     jfoulgham7@delicious.com
A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4      5046684 2023-10-11 08:12:58     2023-10-15 14:23:24     787-30-7976     rgeraldeze@timesonline.co.uk
op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      3336576 2023-10-13 01:29:47     2023-10-15 23:38:29     633-46-7062     enibleyo@bizjournals.com
J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv      1278944 2023-10-13 10:44:51     2023-10-17 04:53:33     619-97-7864     elewzeyu@epa.gov
XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz      1297601 2023-10-13 05:51:16     2023-10-16 16:20:58     853-93-4352     hmcausland2@photobucket.com
59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM      7526453 2023-10-11 19:15:04     2023-10-17 09:44:46     154-99-3394     abarlassy@histats.com
SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2      4467746 2023-10-13 14:21:46     2023-10-17 18:32:12     394-38-1217     jmurrisonf@weibo.com
rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs      1404880 2023-10-12 09:45:34     2023-10-15 10:56:00     496-06-2568     ffearnallh@dyndns.org
SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU      2354014 2023-10-13 21:03:29     2023-10-16 03:13:55     471-60-3968     abloodworthes@cnn.com
jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH      2419832 2023-10-11 05:57:17     2023-10-16 21:07:43     411-53-7708     spalffyr@nytimes.com
sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8      7903061 2023-10-12 16:38:02     2023-10-14 08:48:28     313-61-1383     vrebichon4@is.gd
h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL      1971602 2023-10-11 08:12:58     2023-10-15 14:23:24     104-88-8913     jcobb3@godaddy.com
Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN      4460018 2023-10-13 01:29:47     2023-10-15 23:38:29     137-93-1801     hlettucec@wiley.com
tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO      4745492 2023-10-13 10:44:51     2023-10-17 04:53:33     895-01-1253     rmacgibbonm@icq.com
EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71      7023764 2023-10-13 05:51:16     2023-10-16 16:20:58     509-25-1911     igillum0@wix.com
o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ      3083046 2023-10-11 19:15:04     2023-10-17 09:44:46     390-37-5670     gkernan1@devhub.com
\.
*/


INSERT INTO sistel.reservation (rid, total_price, checkin, checkout, payment, cust_email) VALUES
('UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB', 5686765, '2023-10-12 14:21:46', '2023-10-17 18:32:12', '772-98-9032', 'rbrooksont@barnesandnoble.com'),
('hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA', 4726800, '2023-10-12 09:45:34', '2023-10-15 10:56:00', '581-49-0243', 'slagnew@craigslist.org'),
('QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 7537507, '2023-10-13 21:03:29', '2023-10-16 03:13:55', '352-24-9420', 'jmanchesterb@sciencedaily.com'),
('4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9', 4321111, '2023-10-11 05:57:17', '2023-10-16 21:07:43', '839-50-0348', 'cmcasparand@comcast.net'),
('svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ', 3382717, '2023-10-12 16:38:02', '2023-10-14 08:48:28', '740-71-8191', 'jfoulgham7@delicious.com'),
('A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4', 5046684, '2023-10-11 08:12:58', '2023-10-15 14:23:24', '787-30-7976', 'rgeraldeze@timesonline.co.uk'),
('op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 3336576, '2023-10-13 01:29:47', '2023-10-15 23:38:29', '633-46-7062', 'enibleyo@bizjournals.com'),
('J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv', 1278944, '2023-10-13 10:44:51', '2023-10-17 04:53:33', '619-97-7864', 'elewzeyu@epa.gov'),
('XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz', 1297601, '2023-10-13 05:51:16', '2023-10-16 16:20:58', '853-93-4352', 'hmcausland2@photobucket.com'),
('59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM', 7526453, '2023-10-11 19:15:04', '2023-10-17 09:44:46', '154-99-3394', 'abarlassy@histats.com'),
('SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2', 4467746, '2023-10-13 14:21:46', '2023-10-17 18:32:12', '394-38-1217', 'jmurrisonf@weibo.com'),
('rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs', 1404880, '2023-10-12 09:45:34', '2023-10-15 10:56:00', '496-06-2568', 'ffearnallh@dyndns.org'),
('SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU', 2354014, '2023-10-13 21:03:29', '2023-10-16 03:13:55', '471-60-3968', 'abloodworthes@cnn.com'),
('jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH', 2419832, '2023-10-11 05:57:17', '2023-10-16 21:07:43', '411-53-7708', 'spalffyr@nytimes.com'),
('sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8', 7903061, '2023-10-12 16:38:02', '2023-10-14 08:48:28', '313-61-1383', 'vrebichon4@is.gd'),
('h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL', 1971602, '2023-10-11 08:12:58', '2023-10-15 14:23:24', '104-88-8913', 'jcobb3@godaddy.com'),
('Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN', 4460018, '2023-10-13 01:29:47', '2023-10-15 23:38:29', '137-93-1801', 'hlettucec@wiley.com'),
('tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO', 4745492, '2023-10-13 10:44:51', '2023-10-17 04:53:33', '895-01-1253', 'rmacgibbonm@icq.com'),
('EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71', 7023764, '2023-10-13 05:51:16', '2023-10-16 16:20:58', '509-25-1911', 'igillum0@wix.com'),
('o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ', 3083046, '2023-10-11 19:15:04', '2023-10-17 09:44:46', '390-37-5670', 'gkernan1@devhub.com');


--
-- Data for Name: reservation_actor; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.reservation_actor (email, phonenum, admin_email) FROM stdin;
igillum0@wix.com        7011263901      mbowle19@geocities.com
gkernan1@devhub.com     7862901509      bpainten1a@cafepress.com
hmcausland2@photobucket.com     1608740229      rbarok1b@dot.gov
jcobb3@godaddy.com      2719021226      kbirkhead1c@tiny.cc
vrebichon4@is.gd        7664851571      bcroose1d@sourceforge.net
bbye5@tripadvisor.com   5908016477      mbowle19@geocities.com
scassely6@hexun.com     9958975083      bpainten1a@cafepress.com
jfoulgham7@delicious.com        3514001885      rbarok1b@dot.gov
cklaiser8@wikipedia.org 4989544520      kbirkhead1c@tiny.cc
afigger9@odnoklassniki.ru       9335154322      bcroose1d@sourceforge.net
agrinta@jigsy.com       2438296445      mbowle19@geocities.com
jmanchesterb@sciencedaily.com   9725855379      bpainten1a@cafepress.com
hlettucec@wiley.com     2148628919      rbarok1b@dot.gov
cmcasparand@comcast.net 4133749423      kbirkhead1c@tiny.cc
rgeraldeze@timesonline.co.uk    6639208833      bcroose1d@sourceforge.net
jmurrisonf@weibo.com    7414332428      mbowle19@geocities.com
sstocking@comcast.net   2956487152      bpainten1a@cafepress.com
ffearnallh@dyndns.org   1966924337      rbarok1b@dot.gov
kdrayei@mozilla.org     9951606124      kbirkhead1c@tiny.cc
tzimaj@china.com.cn     7039337788      bcroose1d@sourceforge.net
mgrimsterk@unicef.org   3309377492      mbowle19@geocities.com
bengehaml@sohu.com      6279927884      bpainten1a@cafepress.com
rmacgibbonm@icq.com     5484892553      rbarok1b@dot.gov
csheabern@about.com     4413148038      kbirkhead1c@tiny.cc
enibleyo@bizjournals.com        5302538711      bcroose1d@sourceforge.net
eslavinp@opensource.org 6686799372      mbowle19@geocities.com
rbillsq@amazon.co.jp    5753116478      bpainten1a@cafepress.com
spalffyr@nytimes.com    8366397574      rbarok1b@dot.gov
abloodworthes@cnn.com   3592231868      kbirkhead1c@tiny.cc
rbrooksont@barnesandnoble.com   1678211152      bcroose1d@sourceforge.net
elewzeyu@epa.gov        3764368473      mbowle19@geocities.com
swhiteselv@indiatimes.com       7847680666      bpainten1a@cafepress.com
slagnew@craigslist.org  7497908675      rbarok1b@dot.gov
fdampierx@opensource.org        2829345151      kbirkhead1c@tiny.cc
abarlassy@histats.com   4519632413      bcroose1d@sourceforge.net
pwoolgerz@behance.net   1009690825      mbowle19@geocities.com
ttitterrell10@exblog.jp 8558583975      bpainten1a@cafepress.com
cwoollin11@domainmarket.com     1705362153      rbarok1b@dot.gov
ufearnyhough12@digg.com 1398967809      kbirkhead1c@tiny.cc
ttottle13@utexas.edu    8675334168      bcroose1d@sourceforge.net
trosenhaupt14@businesswire.com  5412902488      mbowle19@geocities.com
abrasier15@e-recht24.de 2248607455      bpainten1a@cafepress.com
imacmichael16@hud.gov   1029402943      rbarok1b@dot.gov
lgresty17@zimbio.com    9506437025      kbirkhead1c@tiny.cc
dmatuszkiewicz18@whitehouse.gov 7201961134      bcroose1d@sourceforge.net
\.
*/

INSERT INTO sistel.reservation_actor (email, phonenum, admin_email) VALUES
('igillum0@wix.com', '7011263901', 'mbowle19@geocities.com'),
('gkernan1@devhub.com', '7862901509', 'bpainten1a@cafepress.com'),
('hmcausland2@photobucket.com', '1608740229', 'rbarok1b@dot.gov'),
('jcobb3@godaddy.com', '2719021226', 'kbirkhead1c@tiny.cc'),
('vrebichon4@is.gd', '7664851571', 'bcroose1d@sourceforge.net'),
('bbye5@tripadvisor.com', '5908016477', 'mbowle19@geocities.com'),
('scassely6@hexun.com', '9958975083', 'bpainten1a@cafepress.com'),
('jfoulgham7@delicious.com', '3514001885', 'rbarok1b@dot.gov'),
('cklaiser8@wikipedia.org', '4989544520', 'kbirkhead1c@tiny.cc'),
('afigger9@odnoklassniki.ru', '9335154322', 'bcroose1d@sourceforge.net'),
('agrinta@jigsy.com', '2438296445', 'mbowle19@geocities.com'),
('jmanchesterb@sciencedaily.com', '9725855379', 'bpainten1a@cafepress.com'),
('hlettucec@wiley.com', '2148628919', 'rbarok1b@dot.gov'),
('cmcasparand@comcast.net', '4133749423', 'kbirkhead1c@tiny.cc'),
('rgeraldeze@timesonline.co.uk', '6639208833', 'bcroose1d@sourceforge.net'),
('jmurrisonf@weibo.com', '7414332428', 'mbowle19@geocities.com'),
('sstocking@comcast.net', '2956487152', 'bpainten1a@cafepress.com'),
('ffearnallh@dyndns.org', '1966924337', 'rbarok1b@dot.gov'),
('kdrayei@mozilla.org', '9951606124', 'kbirkhead1c@tiny.cc'),
('tzimaj@china.com.cn', '7039337788', 'bcroose1d@sourceforge.net'),
('mgrimsterk@unicef.org', '3309377492', 'mbowle19@geocities.com'),
('bengehaml@sohu.com', '6279927884', 'bpainten1a@cafepress.com'),
('rmacgibbonm@icq.com', '5484892553', 'rbarok1b@dot.gov'),
('csheabern@about.com', '4413148038', 'kbirkhead1c@tiny.cc'),
('enibleyo@bizjournals.com', '5302538711', 'bcroose1d@sourceforge.net'),
('eslavinp@opensource.org', '6686799372', 'mbowle19@geocities.com'),
('rbillsq@amazon.co.jp', '5753116478', 'bpainten1a@cafepress.com'),
('spalffyr@nytimes.com', '8366397574', 'rbarok1b@dot.gov'),
('abloodworthes@cnn.com', '3592231868', 'kbirkhead1c@tiny.cc'),
('rbrooksont@barnesandnoble.com', '1678211152', 'bcroose1d@sourceforge.net'),
('elewzeyu@epa.gov', '3764368473', 'mbowle19@geocities.com'),
('swhiteselv@indiatimes.com', '7847680666', 'bpainten1a@cafepress.com'),
('slagnew@craigslist.org', '7497908675', 'rbarok1b@dot.gov'),
('fdampierx@opensource.org', '2829345151', 'kbirkhead1c@tiny.cc'),
('abarlassy@histats.com', '4519632413', 'bcroose1d@sourceforge.net'),
('pwoolgerz@behance.net', '1009690825', 'mbowle19@geocities.com'),
('ttitterrell10@exblog.jp', '8558583975', 'bpainten1a@cafepress.com'),
('cwoollin11@domainmarket.com', '1705362153', 'rbarok1b@dot.gov'),
('ufearnyhough12@digg.com', '1398967809', 'kbirkhead1c@tiny.cc'),
('ttottle13@utexas.edu', '8675334168', 'bcroose1d@sourceforge.net'),
('trosenhaupt14@businesswire.com', '5412902488', 'mbowle19@geocities.com'),
('abrasier15@e-recht24.de', '2248607455', 'bpainten1a@cafepress.com'),
('imacmichael16@hud.gov', '1029402943', 'rbarok1b@dot.gov'),
('lgresty17@zimbio.com', '9506437025', 'kbirkhead1c@tiny.cc'),
('dmatuszkiewicz18@whitehouse.gov', '7201961134', 'bcroose1d@sourceforge.net');


--
-- Data for Name: reservation_room; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.reservation_room (rsv_id, rnum, rhotelname, rhotelbranch, datetime, isactive) FROM stdin;
UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB      101.0   Grand Hotel    Ski Resort       2023-01-08      t
hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA      202.0   Sunset Resort  Business District        2022-12-19      f
QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      303.0   Royal Palace   Mountain Lodge   2023-01-22      t
4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9      404.0   Ocean View Inn City Center      2022-12-22      f
svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ      505.0   Mountain RetreatLakeside Retreat        2023-05-17      f
A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4      606.0   Golden Sands Hotel      Urban Oasis     2023-06-23      t
op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      707.0   Harbor View Lodge       Business District       2023-02-09      t
J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv      808.0   Palm Paradise Resort    Mountain Lodge  2022-12-24      t
XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz      909.0   Silver Star Hotel       Beach Resort    2023-03-23      f
59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM      111.0   Lakeside Manor Historic Downtown        2023-08-10      t
SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2      222.0   Grand Hotel    Ski Resort       2023-03-26      t
rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs      333.0   Sunset Resort  Business District        2023-08-22      t
SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU      444.0   Royal Palace   Mountain Lodge   2023-01-17      t
jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH      555.0   Ocean View Inn City Center      2023-07-17      f
sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8      666.0   Mountain RetreatLakeside Retreat        2023-06-03      t
h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL      777.0   Golden Sands Hotel      Urban Oasis     2023-08-12      t
Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN      888.0   Harbor View Lodge       Business District       2023-03-30      t
tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO      999.0   Palm Paradise Resort    Mountain Lodge  2023-10-10      f
EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71      123.0   Silver Star Hotel       Beach Resort    2023-06-02      t
o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ      234.0   Lakeside Manor Historic Downtown        2023-07-29      t
\.
*/

INSERT INTO sistel.reservation_room (rsv_id, rnum, rhotelname, rhotelbranch, datetime, isactive) VALUES
('UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB', 101.0, 'Grand Hotel', 'Ski Resort', '2023-01-08', 't'),
('hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA', 202.0, 'Sunset Resort', 'Business District', '2022-12-19', 'f'),
('QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 303.0, 'Royal Palace', 'Mountain Lodge', '2023-01-22', 't'),
('4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9', 404.0, 'Ocean View Inn', 'City Center', '2022-12-22', 'f'),
('svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ', 505.0, 'Mountain Retreat', 'Lakeside Retreat', '2023-05-17', 'f'),
('A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4', 606.0, 'Golden Sands Hotel', 'Urban Oasis', '2023-06-23', 't'),
('op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 707.0, 'Harbor View Lodge', 'Business District', '2023-02-09', 't'),
('J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv', 808.0, 'Palm Paradise Resort', 'Mountain Lodge', '2022-12-24', 't'),
('XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz', 909.0, 'Silver Star Hotel', 'Beach Resort', '2023-03-23', 'f'),
('59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM', 111.0, 'Lakeside Manor', 'Historic Downtown', '2023-08-10', 't'),
('SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2', 222.0, 'Grand Hotel', 'Ski Resort', '2023-03-26', 't'),
('rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs', 333.0, 'Sunset Resort', 'Business District', '2023-08-22', 't'),
('SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU', 444.0, 'Royal Palace', 'Mountain Lodge', '2023-01-17', 't'),
('jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH', 555.0, 'Ocean View Inn', 'City Center', '2023-07-17', 'f'),
('sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8', 666.0, 'Mountain Retreat', 'Lakeside Retreat', '2023-06-03', 't'),
('h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL', 777.0, 'Golden Sands Hotel', 'Urban Oasis', '2023-08-12', 't'),
('Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN', 888.0, 'Harbor View Lodge', 'Business District', '2023-03-30', 't'),
('tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO', 999.0, 'Palm Paradise Resort', 'Mountain Lodge', '2023-10-10', 'f'),
('EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71', 123.0, 'Silver Star Hotel', 'Beach Resort', '2023-06-02', 't'),
('o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ', 234.0, 'Lakeside Manor', 'Historic Downtown', '2023-07-29', 't');


--
-- Data for Name: reservation_shuttleservice; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.reservation_shuttleservice (rsv_id, vehicle_num, driver_phonenum, datetime, isactive) FROM stdin;
h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL      GH1782PO        3339151508.0    2023-01-30      t
rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs      BL9872 IJ       3359407108.0    2023-07-25      f
sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8      B9281LL 8966759552.0   2023-05-27       t
op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      WA6638KR        6865417979.0    2023-02-25      f
QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      YE1234AH        3405987596.0    2023-04-08      f
\.
*/

INSERT INTO sistel.reservation_shuttleservice (rsv_id, vehicle_num, driver_phonenum, datetime, isactive) VALUES
('h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL', 'GH1782PO', 3339151508.0, '2023-01-30', 't'),
('rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs', 'BL9872 IJ', 3359407108.0, '2023-07-25', 'f'),
('sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8', 'B9281LL', 8966759552.0, '2023-05-27', 't'),
('op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 'WA6638KR', 6865417979.0, '2023-02-25', 'f'),
('QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 'YE1234AH', 3405987596.0, '2023-04-08', 'f');


--
-- Data for Name: reservation_status; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.reservation_status (id, status) FROM stdin;
A7B1D9E4F2C5G3H0        menunggu
X9Y8Z7W6V5U4T3  terkonfirmasi
P1Q0R2S3T4U5V6  ditolak hotel
K3L7M2N8O1P6Q9  dibatalkan
E4F8G3H2I7J1K6  ditolak sistem
\.
*/

INSERT INTO sistel.reservation_status (id, status) VALUES
('A7B1D9E4F2C5G3H0', 'menunggu'),
('X9Y8Z7W6V5U4T3', 'terkonfirmasi'),
('P1Q0R2S3T4U5V6', 'ditolak hotel'),
('K3L7M2N8O1P6Q9', 'dibatalkan'),
('E4F8G3H2I7J1K6', 'ditolak sistem');



--
-- Data for Name: reservation_status_history; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.reservation_status_history (rid, rsid, datetime) FROM stdin;
UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB      A7B1D9E4F2C5G3H0       2023-10-11 14:21:46
hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA      X9Y8Z7W6V5U4T3  2023-10-11 09:45:34
QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      P1Q0R2S3T4U5V6  2023-10-12 21:03:29
4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9      K3L7M2N8O1P6Q9  2023-10-10 05:57:17
svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ      E4F8G3H2I7J1K6  2023-10-11 16:38:02
A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4      A7B1D9E4F2C5G3H0       2023-10-10 08:12:58
op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      X9Y8Z7W6V5U4T3  2023-10-12 01:29:47
J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv      P1Q0R2S3T4U5V6  2023-10-12 10:44:51
XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz      K3L7M2N8O1P6Q9  2023-10-12 05:51:16
59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM      E4F8G3H2I7J1K6  2023-10-10 19:15:04
SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2      A7B1D9E4F2C5G3H0       2023-10-12 14:21:46
rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs      X9Y8Z7W6V5U4T3  2023-10-11 09:45:34
SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU      P1Q0R2S3T4U5V6  2023-10-12 21:03:29
jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH      K3L7M2N8O1P6Q9  2023-10-10 05:57:17
sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8      E4F8G3H2I7J1K6  2023-10-11 16:38:02
h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL      A7B1D9E4F2C5G3H0       2023-10-10 08:12:58
Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN      X9Y8Z7W6V5U4T3  2023-10-12 01:29:47
tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO      P1Q0R2S3T4U5V6  2023-10-12 10:44:51
EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71      K3L7M2N8O1P6Q9  2023-10-12 05:51:16
o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ      E4F8G3H2I7J1K6  2023-10-10 19:15:04
\.
*/

INSERT INTO sistel.reservation_status_history (rid, rsid, datetime) VALUES
('UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB', 'A7B1D9E4F2C5G3H0', '2023-10-11 14:21:46'),
('hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA', 'X9Y8Z7W6V5U4T3', '2023-10-11 09:45:34'),
('QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 'P1Q0R2S3T4U5V6', '2023-10-12 21:03:29'),
('4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9', 'K3L7M2N8O1P6Q9', '2023-10-10 05:57:17'),
('svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ', 'E4F8G3H2I7J1K6', '2023-10-11 16:38:02'),
('A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4', 'A7B1D9E4F2C5G3H0', '2023-10-10 08:12:58'),
('op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 'X9Y8Z7W6V5U4T3', '2023-10-12 01:29:47'),
('J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv', 'P1Q0R2S3T4U5V6', '2023-10-12 10:44:51'),
('XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz', 'K3L7M2N8O1P6Q9', '2023-10-12 05:51:16'),
('59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM', 'E4F8G3H2I7J1K6', '2023-10-10 19:15:04'),
('SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2', 'A7B1D9E4F2C5G3H0', '2023-10-12 14:21:46'),
('rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs', 'X9Y8Z7W6V5U4T3', '2023-10-11 09:45:34'),
('SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU', 'P1Q0R2S3T4U5V6', '2023-10-12 21:03:29'),
('jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH', 'K3L7M2N8O1P6Q9', '2023-10-10 05:57:17'),
('sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8', 'E4F8G3H2I7J1K6', '2023-10-11 16:38:02'),
('h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL', 'A7B1D9E4F2C5G3H0', '2023-10-10 08:12:58'),
('Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN', 'X9Y8Z7W6V5U4T3', '2023-10-12 01:29:47'),
('tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO', 'P1Q0R2S3T4U5V6', '2023-10-12 10:44:51'),
('EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71', 'K3L7M2N8O1P6Q9', '2023-10-12 05:51:16'),
('o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ', 'E4F8G3H2I7J1K6', '2023-10-10 19:15:04');

--
-- Data for Name: reservation_use_promo; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.reservation_use_promo (rid, pid) FROM stdin;
UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB      AB3cE2dF1gH5iJ7kL9mNoQpR
hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA      XyZaB8cDE3Fg4HiJ0Km1Np2
QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9      T2uVwY4zABcDe6FGhIj8Kl
4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9      qRu5sTgH3iVjWk9LmNxY
svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ      O7pQrS0tUvW1xYzAB2C3D
A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4      V4E5FgHi6JkLmNoP7QsT
op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ      D8E0FgHiJ1K2L4M5NpQR
J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv      oS7T9vW0xYzABcDfGhIj
XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz      2Kl3mNp5qRsTuVwXyZaBc
59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM      uD1E4F5gHi6JkLmNoP
SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2      2Q3rStUvWx4Y5zAB6C7
rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs      D8eFgH9IjK1LmNoPqR
SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU      R3S0tUvW1XyZ2aBcDeF
jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH      hIjK4LmNoP6Q7R8sTuV
sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8      vW0xYzABcD1E3F5gHiJ
h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL      JkLmNoPqR2S3tUvW4X
Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN      yZaBcDe5FgH6IjK8Lm
tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO      NoPqR9S0tU1vW2xYzA
EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71      3BcDe5F7gHi8JkLmNo
o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ      1PqR2S3tUvW4xYzAB
\.
*/

INSERT INTO sistel.reservation_use_promo (rid, pid) VALUES
('UUFC5nxStJr8lBuxHL7VCzNFkjwa6QBg2DCs00rOsnevsSFSuB', 'AB3cE2dF1gH5iJ7kL9mNoQpR'),
('hvhYmQ0MYSA39arYgue9sgH3ObGkz9ZhyyWJcYVqbiRKRWwVeA', 'XyZaB8cDE3Fg4HiJ0Km1Np2'),
('QTVIwkkkDW4OLYeGfGBDzH88YiHwuGuCkfwXsak6uHXDenKaW9', 'T2uVwY4zABcDe6FGhIj8Kl'),
('4BteZHj3h5FcXfJKD61LlkN1leUpUK185sxzM2VI2C3ruKJOE9', 'qRu5sTgH3iVjWk9LmNxY'),
('svgoLZJLBP6JrfyHyVnPevDZqh96Zzw8gtEYf8U7CnHr7O2MtQ', 'O7pQrS0tUvW1xYzAB2C3D'),
('A9jMe9KOKkp3EnI3hJQcAGFIHzaXZn5EHxZt8TIMrqwBPgbzp4', 'V4E5FgHi6JkLmNoP7QsT'),
('op3nwyZXlZPNImimETsNByfI55EdX6xAZCXa3GwC5Nz6mbRKXJ', 'D8E0FgHiJ1K2L4M5NpQR'),
('J4wuk1hfoT89tXbcUwyHGh1ZKswk3d1zAJMpkrkuSkb62PrzAv', 'oS7T9vW0xYzABcDfGhIj'),
('XbeqqiwzSwbRcCPIybzHUmjsXEtVOHqlOkF7CuhMNsXB4PDbpz', '2Kl3mNp5qRsTuVwXyZaBc'),
('59eXBwbntQAWUdGEx7ERIQM1to4sjz9GB7Sxmi2R3Pm4ceverM', 'uD1E4F5gHi6JkLmNoP'),
('SUe7qZ1KtIOGnTQlRYwlWeV9qlX9RhSMh8WzK2Ea25hkre8LM2', '2Q3rStUvWx4Y5zAB6C7'),
('rhZukl5fPQrHk9mttCJKWXemXXfTRtpZWRS4RcUAzYdFdVXkJs', 'D8eFgH9IjK1LmNoPqR'),
('SrGlAlsiBLZhhZBq7Y6YfXonjAV3HCsRA3RzGKAhiCjxHRueHU', 'R3S0tUvW1XyZ2aBcDeF'),
('jwAWmUEQxvd9rmMgKowJ0X6Ic0hBuA4nGNEg3fDx51SwLFqutH', 'hIjK4LmNoP6Q7R8sTuV'),
('sBhqelQuYeXRkCWQG0P6zj6NCuTbP2rYeX8SRE5KXH7lOAFiQ8', 'vW0xYzABcD1E3F5gHiJ'),
('h8TFgIX1qgJEAnxpGlpJjYiruA7s0x5Hl1nkbAL1XnDxQbQWbL', 'JkLmNoPqR2S3tUvW4X'),
('Ug9aSk8mpowJjC0KjjLspbn1a2t10Vmn57ssGz30iDvfVQgWzN', 'yZaBcDe5FgH6IjK8Lm'),
('tao9IGhvNKe1cQuncMNqJsyHPQOUcup6xrLQGKjhrFWIA1IDtO', 'NoPqR9S0tU1vW2xYzA'),
('EB5q5KPfkwTYcxKtHqAqqjtek0N5VyY7pr6JG0kMiVTxkDrQ71', '3BcDe5F7gHi8JkLmNo'),
('o9jA0u8hNdC0MH0Jk1dY9FDIhagyRevLw9EhxMgr2ziIuxKyaZ', '1PqR2S3tUvW4xYzAB');


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.reviews (id, cust_email, rating, review, hotel_name, hotel_branch) FROM stdin;
A1B2C3D4E5      igillum0@wix.com        9       Hotel ini memiliki pemandangan laut yang menakjubkan, sangat merekomendasikan untuk pasangan bulan madu!       Grand Hotel      Ski Resort
F6G7H8I9J0      gkernan1@devhub.com     10      Staf hotel sangat ramah dan selalu siap membantu. Mereka membuat saya merasa seperti di rumah.  Sunset Resort  Business District
K1L2M3N4O5      hmcausland2@photobucket.com     5       Sangat kecewa dengan WiFi yang sering terputus. Sebagai pelancong bisnis, koneksi internet yang stabil sangat penting bagi saya.        Royal Palace    Mountain Lodge
P6Q7R8S9T0      jcobb3@godaddy.com      6       Meskipun lokasinya strategis, suara bising dari jalan raya sangat mengganggu. Saya kesulitan tidur nyenyak semalaman.   Ocean View Inn  City Center
U1V2W3X4Y5      vrebichon4@is.gd        4       Kolam renangnya kotor dan fasilitas gym sangat terbatas. Harap ditingkatkan!    Mountain Retreat        Lakeside Retreat
Z6A7B8C9D0      bbye5@tripadvisor.com   2       Layanan di hotel ini sangat mengecewakan. Saya menunggu lebih dari satu jam untuk check-in.     Golden Sands Hotel      Urban Oasis
E1F2G3H4I5      scassely6@hexun.com     3       Sulit menemukan parkir di hotel ini, dan saya dikenakan biaya tambahan untuk valet.     Harbor View Lodge      Business District
J6K7L8M9N0      jfoulgham7@delicious.com        1       Makanan di restoran hotel tidak sesuai dengan harga yang mereka kenakan. Porsi kecil dan rasa biasa saja, saya harapkan lebih dari ini. Palm Paradise Resort    Mountain Lodge
O1P2Q3R4S5      cklaiser8@wikipedia.org 7       Lokasinya strategis, dekat dengan pusat belanja dan restoran-restoran populer.  Silver Star Hotel       Beach Resort
T6U7V8W9X0      afigger9@odnoklassniki.ru       8       Kamar-kamarnya luas dan bersih. Sarapan paginya juga lezat dan bervariasi.      Lakeside Manor  Historic Downtown
\.
*/

INSERT INTO sistel.reviews (id, cust_email, rating, review, hotel_name, hotel_branch) VALUES
('A1B2C3D4E5', 'igillum0@wix.com', 9, 'Hotel ini memiliki pemandangan laut yang menakjubkan, sangat merekomendasikan untuk pasangan bulan madu!', 'Grand Hotel', 'Ski Resort'),
('F6G7H8I9J0', 'gkernan1@devhub.com', 10, 'Staf hotel sangat ramah dan selalu siap membantu. Mereka membuat saya merasa seperti di rumah.', 'Sunset Resort', 'Business District'),
('K1L2M3N4O5', 'hmcausland2@photobucket.com', 5, 'Sangat kecewa dengan WiFi yang sering terputus. Sebagai pelancong bisnis, koneksi internet yang stabil sangat penting bagi saya.', 'Royal Palace', 'Mountain Lodge'),
('P6Q7R8S9T0', 'jcobb3@godaddy.com', 6, 'Meskipun lokasinya strategis, suara bising dari jalan raya sangat mengganggu. Saya kesulitan tidur nyenyak semalaman.', 'Ocean View Inn', 'City Center'),
('U1V2W3X4Y5', 'vrebichon4@is.gd', 4, 'Kolam renangnya kotor dan fasilitas gym sangat terbatas. Harap ditingkatkan!', 'Mountain Retreat', 'Lakeside Retreat'),
('Z6A7B8C9D0', 'bbye5@tripadvisor.com', 2, 'Layanan di hotel ini sangat mengecewakan. Saya menunggu lebih dari satu jam untuk check-in.', 'Golden Sands Hotel', 'Urban Oasis'),
('E1F2G3H4I5', 'scassely6@hexun.com', 3, 'Sulit menemukan parkir di hotel ini, dan saya dikenakan biaya tambahan untuk valet.', 'Harbor View Lodge', 'Business District'),
('J6K7L8M9N0', 'jfoulgham7@delicious.com', 1, 'Makanan di restoran hotel tidak sesuai dengan harga yang mereka kenakan. Porsi kecil dan rasa biasa saja, saya harapkan lebih dari ini.', 'Palm Paradise Resort', 'Mountain Lodge'),
('O1P2Q3R4S5', 'cklaiser8@wikipedia.org', 7, 'Lokasinya strategis, dekat dengan pusat belanja dan restoran-restoran populer.', 'Silver Star Hotel', 'Beach Resort'),
('T6U7V8W9X0', 'afigger9@odnoklassniki.ru', 8, 'Kamar-kamarnya luas dan bersih. Sarapan paginya juga lezat dan bervariasi.', 'Lakeside Manor', 'Historic Downtown');


--
-- Data for Name: room; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*COPY sistel.room (hotel_name, hotel_branch, number, price, floor) FROM stdin;
Grand Hotel     Ski Resort      101.0   1902384 9
Sunset Resort   Business District       202.0   2798151 6
Royal Palace    Mountain Lodge  303.0   4153710 2
Ocean View Inn  City Center     404.0   5142340 2
Mountain Retreat        Lakeside Retreat        505.0   7470917 6
Golden Sands Hotel      Urban Oasis     606.0   5807999 9
Harbor View Lodge       Business District       707.0   2370293 1
Palm Paradise Resort    Mountain Lodge  808.0   3798421 7
Silver Star Hotel       Beach Resort    909.0   7488957 5
Lakeside Manor  Historic Downtown       111.0   6786719 4
Grand Hotel     Ski Resort      222.0   1705195 12
Sunset Resort   Business District       333.0   4284778 5
Royal Palace    Mountain Lodge  444.0   2056623 4
Ocean View Inn  City Center     555.0   4691971 12
Mountain Retreat        Lakeside Retreat        666.0   2544132 12
Golden Sands Hotel      Urban Oasis     777.0   4873018 6
Harbor View Lodge       Business District       888.0   6823181 12
Palm Paradise Resort    Mountain Lodge  999.0   1045040 3
Silver Star Hotel       Beach Resort    123.0   4627159 9
Lakeside Manor  Historic Downtown       234.0   7437607 11
Grand Hotel     Ski Resort      345.0   7052226 11
Sunset Resort   Business District       456.0   4405330 11
Royal Palace    Mountain Lodge  567.0   1073937 8
Ocean View Inn  City Center     678.0   5800234 9
Mountain Retreat        Lakeside Retreat        789.0   3442971 1
Golden Sands Hotel      Urban Oasis     890.0   2479423 3
Harbor View Lodge       Business District       246.0   499389  9
Palm Paradise Resort    Mountain Lodge  135.0   2290266 8
Silver Star Hotel       Beach Resort    468.0   926579  6
Lakeside Manor  Historic Downtown       579.0   4725372 5
\.
*/

INSERT INTO sistel.room (hotel_name, hotel_branch, number, price, floor) VALUES
('Grand Hotel', 'Ski Resort', 101.0, 1902384, 9),
('Sunset Resort', 'Business District', 202.0, 2798151, 6),
('Royal Palace', 'Mountain Lodge', 303.0, 4153710, 2),
('Ocean View Inn', 'City Center', 404.0, 5142340, 2),
('Mountain Retreat', 'Lakeside Retreat', 505.0, 7470917, 6),
('Golden Sands Hotel', 'Urban Oasis', 606.0, 5807999, 9),
('Harbor View Lodge', 'Business District', 707.0, 2370293, 1),
('Palm Paradise Resort', 'Mountain Lodge', 808.0, 3798421, 7),
('Silver Star Hotel', 'Beach Resort', 909.0, 7488957, 5),
('Lakeside Manor', 'Historic Downtown', 111.0, 6786719, 4),
('Grand Hotel', 'Ski Resort', 222.0, 1705195, 12),
('Sunset Resort', 'Business District', 333.0, 4284778, 5),
('Royal Palace', 'Mountain Lodge', 444.0, 2056623, 4),
('Ocean View Inn', 'City Center', 555.0, 4691971, 12),
('Mountain Retreat', 'Lakeside Retreat', 666.0, 2544132, 12),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 4873018, 6),
('Harbor View Lodge', 'Business District', 888.0, 6823181, 12),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, 1045040, 3),
('Silver Star Hotel', 'Beach Resort', 123.0, 4627159, 9),
('Lakeside Manor', 'Historic Downtown', 234.0, 7437607, 11),
('Grand Hotel', 'Ski Resort', 345.0, 7052226, 11),
('Sunset Resort', 'Business District', 456.0, 4405330, 11),
('Royal Palace', 'Mountain Lodge', 567.0, 1073937, 8),
('Ocean View Inn', 'City Center', 678.0, 5800234, 9),
('Mountain Retreat', 'Lakeside Retreat', 789.0, 3442971, 1),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 2479423, 3),
('Harbor View Lodge', 'Business District', 246.0, 499389, 9),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, 2290266, 8),
('Silver Star Hotel', 'Beach Resort', 468.0, 926579, 6),
('Lakeside Manor', 'Historic Downtown', 579.0, 4725372, 5);


--
-- Data for Name: room_facilities; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) FROM stdin;
Golden Sands Hotel      Urban Oasis     606.0   ONRw09YqlyufUOy9GEZ8    2288.14780144577981
Golden Sands Hotel      Urban Oasis     777.0   NHEw9eTtbWWf3dHDJsa9    2902.07758389059018
Golden Sands Hotel      Urban Oasis     890.0   qluMsS9z8ii0dyx26M7y    1459.4999813177601
Golden Sands Hotel      Urban Oasis     606.0   lFeMjLuF9mR4apJa2Xfh    2348.48286283849984
Golden Sands Hotel      Urban Oasis     777.0   Ml7ZsO9W8zH2Ap7rhWz0    3542.07160284684005
Golden Sands Hotel      Urban Oasis     890.0   wUjNBzSJVTu2dPcj4uij    611.060575280833973
Golden Sands Hotel      Urban Oasis     606.0   pkWnWHuzfpC2zh28FBCb    3754.03182922901988
Golden Sands Hotel      Urban Oasis     777.0   qtTLZ8dsmgy1J3PMR4C5    1620.10167545384002
Golden Sands Hotel      Urban Oasis     890.0   z5s50lEvWp1tj9SBwvhW    2292.74085621109998
Golden Sands Hotel      Urban Oasis     606.0   WDSicK0tfUAwM7Y7MxxS    3535.89937212611994
Golden Sands Hotel      Urban Oasis     777.0   YKrJfHJafyVYVC1yoaDc    1080.22649128956004
Golden Sands Hotel      Urban Oasis     890.0   C69VrrwNCQpxT4Op1ocA    3128.06878126559013
Golden Sands Hotel      Urban Oasis     606.0   pcbbeEIdk6bdqEkRAV1n    1386.57005023038005
Golden Sands Hotel      Urban Oasis     777.0   RczQD2wr13seCrqkUIAQ    2881.8190390340701
Golden Sands Hotel      Urban Oasis     890.0   Im2q8BKFckZHHbrnBQmE    3892.12100313920018
Grand Hotel     Ski Resort      101.0   l7Nan1lu0gnI1kuhkSBP    3066.36003794712997
Grand Hotel     Ski Resort      222.0   rUd17wjqBIMpMYhAAGYh    754.814240064795968
Grand Hotel     Ski Resort      345.0   EgqEoUoFiwImDRJe4HLK    3783.17839081435022
Grand Hotel     Ski Resort      101.0   smr0wxwTQp2dIHO45kVR    2651.15668319654014
Grand Hotel     Ski Resort      222.0   vnPLIz78j5lkDVtDcoK4    1532.77217393771002
Grand Hotel     Ski Resort      345.0   ZolsnBNn4DHRJLCMkaKX    3196.60979404520003
Grand Hotel     Ski Resort      101.0   vSV5zAhPnhauYMQAV1FI    3040.49163927492009
Grand Hotel     Ski Resort      222.0   BIZrxaUweZ1vTZicnlEl    3896.56659410863995
Grand Hotel     Ski Resort      345.0   wFrLTI3o7Oey2UOPiEX6    3142.74399420429017
Grand Hotel     Ski Resort      101.0   MLCgY5itpzzvPNb8PrTP    1936.24920639263996
Grand Hotel     Ski Resort      222.0   eyYOS2udd5kgr8LrfZmf    3505.55549581174
Grand Hotel     Ski Resort      345.0   byyzU6VhMV3IR7fnkexu    3115.84569024539996
Grand Hotel     Ski Resort      101.0   Ew1QQiv9YSc9mpMI3H5h    1351.3366883435101
Grand Hotel     Ski Resort      222.0   dt5ZhRJhswN0qSahlR8c    3844.23332312514003
Grand Hotel     Ski Resort      345.0   L57WJKpNM61gJXH9HHBx    1776.73305407881003
Harbor View Lodge       Business District       707.0   Jl8j8onEalzoEHpIWwzS   1236.0458437391801
Harbor View Lodge       Business District       888.0   EMlhjaJGcas62w2ttZd3   1573.55712271238008
Harbor View Lodge       Business District       246.0   qSMxFiLCob3JRqDxEeGU   871.70894159191505
Harbor View Lodge       Business District       707.0   9W2oMhyhbq8nMUKzKEHx   527.66888168775904
Harbor View Lodge       Business District       888.0   lUXo4tn31kxWDs587NyC   208.111306080911987
Harbor View Lodge       Business District       246.0   udGMDfhrfSILlX5OQlsj   2327.7999028767299
Harbor View Lodge       Business District       707.0   yqZWY6z4kuF5Vo8fLgqK   441.96521011555501
Harbor View Lodge       Business District       888.0   Xvnzh6wNlo7p4Kjt2HTr   3977.65293192734998
Harbor View Lodge       Business District       246.0   ekjT7GB3kfbUcIOCaLkT   402.819942331057973
Harbor View Lodge       Business District       707.0   sWM850mRafOzLPeTYPlr   729.048925427705967
Harbor View Lodge       Business District       888.0   wTtWBfZIxsUmC5hqzZop   2023.40023200721998
Harbor View Lodge       Business District       246.0   5CYvmriRYcQtyRE2zdvF   3309.19562337866
Harbor View Lodge       Business District       707.0   QkxKt3fmzMwwbq6duwvL   3986.28754845582989
Harbor View Lodge       Business District       888.0   85O2Ah76rYdRnqRQo3Ig   616.127959955901019
Harbor View Lodge       Business District       246.0   m3F8ts65oSLInS3w7Hu9   1991.37583360594999
Lakeside Manor  Historic Downtown       111.0   3fTjSW1kaGQzWIhQMiYU    3950.52790350978012
Lakeside Manor  Historic Downtown       234.0   36r7TDGNPO11OjLek2tU    323.766876348033009
Lakeside Manor  Historic Downtown       579.0   bcB947K3eFZmPIP4xobe    2503.45373624013018
Lakeside Manor  Historic Downtown       111.0   e44Z0QcsNqIU5rHYlYGb    3754.44841262827003
Lakeside Manor  Historic Downtown       234.0   mQbBWeA3w4CrJG5wrJO0    550.435511636499996
Lakeside Manor  Historic Downtown       579.0   FGGEtzXgsYcNlyKHXeke    3876.40716498278016
Lakeside Manor  Historic Downtown       111.0   4nvfAfdiJg9aI9I3N3aU    2238.32478635664984
Lakeside Manor  Historic Downtown       234.0   Bu5dyfqq8qtCp7If58YZ    742.256441827463959
Lakeside Manor  Historic Downtown       579.0   0gDYzu5K6Gwce3OxLrrM    2928.03686479087992
Lakeside Manor  Historic Downtown       111.0   I1xLud7dcdYWXDVpqxVy    1980.55032111911009
Lakeside Manor  Historic Downtown       234.0   RbJtUmPcz0JRDnZm96Dd    1521.38957407216003
Lakeside Manor  Historic Downtown       579.0   WUQgpsLaxKpFHwCMPR9h    3249.23604528411988
Lakeside Manor  Historic Downtown       111.0   LU4uja6kp5rjtE0hcr3Q    3093.9339285364199
Lakeside Manor  Historic Downtown       234.0   gNiL3dIb1J3IXOegfoWw    1974.41702291755996
Lakeside Manor  Historic Downtown       579.0   q0OAyoFyLxbi9uIACeMJ    3222.38138306094015
Mountain Retreat        Lakeside Retreat        505.0   xC0BU2vhKJyTMMAmsFVP   2444.60535317406993
Mountain Retreat        Lakeside Retreat        666.0   2920d78f3bPglAolRD4J   1146.96182546135992
Mountain Retreat        Lakeside Retreat        789.0   PkKHc264vSqGhwqKAQO8   2099.90956415782011
Mountain Retreat        Lakeside Retreat        505.0   u7dH9KBvmewAp5eW4Mzc   2042.4960088523701
Mountain Retreat        Lakeside Retreat        666.0   VGhtNh64xzklNfmZw8qh   1545.27015880361
Mountain Retreat        Lakeside Retreat        789.0   xcwhUnzHm44X6wA5DLts   728.38519310077595
Mountain Retreat        Lakeside Retreat        505.0   kA5Ov7NopJaaiyjAMRq6   3170.49001616828991
Mountain Retreat        Lakeside Retreat        666.0   HxOx6cGzLDP6FNOwotjm   3461.29564265037016
Mountain Retreat        Lakeside Retreat        789.0   4k2I8v43GxAugxAAC3U2   1407.87788113436
Mountain Retreat        Lakeside Retreat        505.0   863U4uYsKVvhrmGFwLAg   2444.52986052396
Mountain Retreat        Lakeside Retreat        666.0   trYslk2hFtRcKiLVYFtE   1760.1118643529901
Mountain Retreat        Lakeside Retreat        789.0   U4jNcpGjhCB84roRfUr8   1588.32956748565994
Mountain Retreat        Lakeside Retreat        505.0   lN8QNjKNkO8vNi2R42u1   954.848468630670027
Mountain Retreat        Lakeside Retreat        666.0   WZRdQL1h11DgTpeXGiBY   793.551903916624951
Mountain Retreat        Lakeside Retreat        789.0   H1CyKtl2DNInmg35JtfP   2247.95577334020982
Ocean View Inn  City Center     404.0   LqQNdrIiTN7ROcpg8iE1    3261.25833961496983
Ocean View Inn  City Center     555.0   XFUIabpxAaGuIAXktvBr    1945.25540529390992
Ocean View Inn  City Center     678.0   I1bcWBSod45c0xmUsGNP    561.295036792387009
Ocean View Inn  City Center     404.0   uGptZvPoJxovF9zfWg3x    1523.6662471448501
Ocean View Inn  City Center     555.0   YxnfpTUq58TsuObHS930    3769.50535876361982
Ocean View Inn  City Center     678.0   8SNxOyOJGqiAaCHw98Af    1596.90510022596004
Ocean View Inn  City Center     404.0   sXAA8LfPhVCYWxoB2PPq    3589.31422374204021
Ocean View Inn  City Center     555.0   VLwlG4etfh77ImFAP3b0    1475.50003940226998
Ocean View Inn  City Center     678.0   1eLcENmfeNukiVYFJEIf    1136.32672863343009
Ocean View Inn  City Center     404.0   DGXr1UAgyNYSZa0guYwv    3086.75781677412988
Ocean View Inn  City Center     555.0   2VlXghqpDFMKlJIvHueQ    3465.34717689658009
Ocean View Inn  City Center     678.0   WyXtaZVUs7HUl81R5rZS    3418.99805759358014
Ocean View Inn  City Center     404.0   tm1U67CB62JcIM8pjQRP    845.684087877094044
Ocean View Inn  City Center     555.0   qjahIfKdWz4fBfSa9aiW    1900.67259811173994
Ocean View Inn  City Center     678.0   PFcehlsoSJOlMS28CmHb    1771.99296863613995
Palm Paradise Resort    Mountain Lodge  808.0   wJask8Hy0GpfTb0Gg8OJ    1645.9286375721199
Palm Paradise Resort    Mountain Lodge  999.0   5AcZSeuHYdt9iuJJ4dU6    2260.73527658498006
Palm Paradise Resort    Mountain Lodge  135.0   d0f9QKHDhGIFsW9Xh6nQ    1033.19167342681999
Palm Paradise Resort    Mountain Lodge  808.0   ST0kh9KX8NGyauZecwsd    2160.43246013548014
Palm Paradise Resort    Mountain Lodge  999.0   CKA5OtAaLnMN6UD5FtCE    2109.89348570831999
Palm Paradise Resort    Mountain Lodge  135.0   vFTBEhHXtuVqH86y27pI    3986.12681576192017
Palm Paradise Resort    Mountain Lodge  808.0   7hW7BECO2C3WRSw0AC5G    374.388616651170992
Palm Paradise Resort    Mountain Lodge  999.0   6g1SIwkRdBC7tFw4cU13    1099.37456365519006
Palm Paradise Resort    Mountain Lodge  135.0   YfhaO5Hj5WiSwsTOf2Bz    1144.25771286634995
Palm Paradise Resort    Mountain Lodge  808.0   od6islsDwxAQ6teIj4KD    3772.53209914611989
Palm Paradise Resort    Mountain Lodge  999.0   u46Hu6eyLSYYXkx0cRAh    569.179204040771992
Palm Paradise Resort    Mountain Lodge  135.0   FuaNzhGttSopMVJXPCKl    822.561352234303968
Palm Paradise Resort    Mountain Lodge  808.0   LNSS5Kvd0nTMROqRKtfK    245.631362159224011
Palm Paradise Resort    Mountain Lodge  999.0   1YhCc7moVCKD67xtEuR8    1070.36200102719999
Palm Paradise Resort    Mountain Lodge  135.0   9bJIId4IZlHSeAOjdkvd    1910.14852842878008
Royal Palace    Mountain Lodge  303.0   PggdkEHx57yHVNQrxAxH    2692.08978682146017
Royal Palace    Mountain Lodge  444.0   pa397cmx39IIzRamJO2G    3481.42913062116986
Royal Palace    Mountain Lodge  567.0   3JzoRHqplpXZZFcjukPq    806.307301327506025
Royal Palace    Mountain Lodge  303.0   4d5FDnpIo0rL0HvyyKLJ    1955.91199223392005
Royal Palace    Mountain Lodge  444.0   rrdwKyTMqwcpob2Pw4Nx    1303.17369171621999
Royal Palace    Mountain Lodge  567.0   t8mPXkXGdPzKoEKSngrD    3455.05426448898015
Royal Palace    Mountain Lodge  303.0   FhYWKSYm1yhRVoFBdc08    2141.54764493406992
Royal Palace    Mountain Lodge  444.0   AhJKZKd6mb4X9OX6MMzg    1377.24446795683002
Royal Palace    Mountain Lodge  567.0   WqVrhrutiJOOvFXLrHna    606.843598510350944
Royal Palace    Mountain Lodge  303.0   eNmCLHb1pfGiCLdQRTUB    2884.99295248892986
Royal Palace    Mountain Lodge  444.0   iwlWbhZdfMQydbJDTDQg    3545.9163383278501
Royal Palace    Mountain Lodge  567.0   KFKLtVIyLt8sTQEUnWGK    1031.90222799011008
Royal Palace    Mountain Lodge  303.0   1urCVklJ8DYtOlHvQhDU    2959.04592604013988
Royal Palace    Mountain Lodge  444.0   b06dPc0xgQROemPhHdmO    247.724024168184002
Royal Palace    Mountain Lodge  567.0   J3nnqUyWvh93EFs5KUeK    3480.80177206015014
Silver Star Hotel       Beach Resort    909.0   B2NM8elQkaBzNmcaclNi    1119.9827214495599
Silver Star Hotel       Beach Resort    123.0   1JbbJYSLTHbudgdpVQ9u    2747.5320694000402
Silver Star Hotel       Beach Resort    468.0   aWKB4f5hLCW7tbs15lcV    3217.15585804039983
Silver Star Hotel       Beach Resort    909.0   IDkkLHazAgchAobtpVOU    252.795337799692987
Silver Star Hotel       Beach Resort    123.0   jSfJAwOkS5ctCWwYtMkZ    899.642237440580971
Silver Star Hotel       Beach Resort    468.0   9cOCyChROSUDhm2IkhyC    590.099044093747011
Silver Star Hotel       Beach Resort    909.0   8xAvm9EEsAjhm35AdhTW    2832.82576201928987
Silver Star Hotel       Beach Resort    123.0   jpJ0VvajeLSie920mHZN    2588.94282361748992
Silver Star Hotel       Beach Resort    468.0   Wf0NVogEQO3WwxmeDman    3427.1088977907998
Silver Star Hotel       Beach Resort    909.0   JWGN7vowdmu76VFJQmaG    1102.39703318011993
Silver Star Hotel       Beach Resort    123.0   rWv2aFvW94APBLJJ8fiS    881.655001343651975
Silver Star Hotel       Beach Resort    468.0   BQOM5XH7EMfFC32nXr9N    2904.0954391923101
Silver Star Hotel       Beach Resort    909.0   FN8EeLevIGQFpr06dA51    3349.19693984940977
Silver Star Hotel       Beach Resort    123.0   2bVxtgYP1hs6Hm49ALOz    2828.58436866112015
Silver Star Hotel       Beach Resort    468.0   2IavpGEVAOUY1Gz0T92e    2940.06067634306009
Sunset Resort   Business District       202.0   7xzLrJ75SCCpDTLecEsl    462.267592158464993
Sunset Resort   Business District       333.0   Uz0TeQkq0UwkMBHRZK6M    532.994710908973047
Sunset Resort   Business District       456.0   KMLdcuEiWUNDVBgZ8tNy    1589.71273437694003
Sunset Resort   Business District       202.0   qcuUnKxw3yNVtu9dW3Uo    1566.38537448819989
Sunset Resort   Business District       333.0   artOvLAu0oG2ObTQU3Ym    1709.30789101049004
Sunset Resort   Business District       456.0   Ej3E58qQL9p0vO2tMS9O    1073.61408474419
Sunset Resort   Business District       202.0   QEFjMTBbVyvaltvzFgUg    2586.94285158374987
Sunset Resort   Business District       333.0   9LS664RImZrMS7XKGbdd    666.893926610418021
Sunset Resort   Business District       456.0   za3oyqSJjP4LflFoG80P    2883.67744095928992
Sunset Resort   Business District       202.0   u7zK1EcYrqPfComVlwFN    512.021218201326974
Sunset Resort   Business District       333.0   nV2ffJuWiXX3FoF0Y3ce    1453.05001978254995
Sunset Resort   Business District       456.0   65builoSTBgXAkbOGihp    477.653154612801018
Sunset Resort   Business District       202.0   FT5rSrXrawu2GId9A6QY    1983.62680923071002
Sunset Resort   Business District       333.0   HTsRZ2YJIrrgejFvrpnO    3367.38670337082021
Sunset Resort   Business District       456.0   LvAuuYaVn0ptRNc0jFKE    2177.55246116035005
\.
*/

INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Golden Sands Hotel', 'Urban Oasis', 606.0, 'ONRw09YqlyufUOy9GEZ8', 2288.14780144577981),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 'NHEw9eTtbWWf3dHDJsa9', 2902.07758389059018),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 'qluMsS9z8ii0dyx26M7y', 1459.4999813177601),
('Golden Sands Hotel', 'Urban Oasis', 606.0, 'lFeMjLuF9mR4apJa2Xfh', 2348.48286283849984),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 'Ml7ZsO9W8zH2Ap7rhWz0', 3542.07160284684005),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 'wUjNBzSJVTu2dPcj4uij', 611.060575280833973),
('Golden Sands Hotel', 'Urban Oasis', 606.0, 'pkWnWHuzfpC2zh28FBCb', 3754.03182922901988),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 'qtTLZ8dsmgy1J3PMR4C5', 1620.10167545384002),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 'z5s50lEvWp1tj9SBwvhW', 2292.74085621109998),
('Golden Sands Hotel', 'Urban Oasis', 606.0, 'WDSicK0tfUAwM7Y7MxxS', 3535.89937212611994),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 'YKrJfHJafyVYVC1yoaDc', 1080.22649128956004),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 'C69VrrwNCQpxT4Op1ocA', 3128.06878126559013),
('Golden Sands Hotel', 'Urban Oasis', 606.0, 'pcbbeEIdk6bdqEkRAV1n', 1386.57005023038005),
('Golden Sands Hotel', 'Urban Oasis', 777.0, 'RczQD2wr13seCrqkUIAQ', 2881.8190390340701),
('Golden Sands Hotel', 'Urban Oasis', 890.0, 'Im2q8BKFckZHHbrnBQmE', 3892.12100313920018);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Grand Hotel', 'Ski Resort', 101.0, 'l7Nan1lu0gnI1kuhkSBP', 3066.36003794712997),
('Grand Hotel', 'Ski Resort', 222.0, 'rUd17wjqBIMpMYhAAGYh', 754.814240064795968),
('Grand Hotel', 'Ski Resort', 345.0, 'EgqEoUoFiwImDRJe4HLK', 3783.17839081435022),
('Grand Hotel', 'Ski Resort', 101.0, 'smr0wxwTQp2dIHO45kVR', 2651.15668319654014),
('Grand Hotel', 'Ski Resort', 222.0, 'vnPLIz78j5lkDVtDcoK4', 1532.77217393771002),
('Grand Hotel', 'Ski Resort', 345.0, 'ZolsnBNn4DHRJLCMkaKX', 3196.60979404520003),
('Grand Hotel', 'Ski Resort', 101.0, 'vSV5zAhPnhauYMQAV1FI', 3040.49163927492009),
('Grand Hotel', 'Ski Resort', 222.0, 'BIZrxaUweZ1vTZicnlEl', 3896.56659410863995),
('Grand Hotel', 'Ski Resort', 345.0, 'wFrLTI3o7Oey2UOPiEX6', 3142.74399420429017),
('Grand Hotel', 'Ski Resort', 101.0, 'MLCgY5itpzzvPNb8PrTP', 1936.24920639263996),
('Grand Hotel', 'Ski Resort', 222.0, 'eyYOS2udd5kgr8LrfZmf', 3505.55549581174),
('Grand Hotel', 'Ski Resort', 345.0, 'byyzU6VhMV3IR7fnkexu', 3115.84569024539996),
('Grand Hotel', 'Ski Resort', 101.0, 'Ew1QQiv9YSc9mpMI3H5h', 1351.3366883435101),
('Grand Hotel', 'Ski Resort', 222.0, 'dt5ZhRJhswN0qSahlR8c', 3844.23332312514003),
('Grand Hotel', 'Ski Resort', 345.0, 'L57WJKpNM61gJXH9HHBx', 1776.73305407881003);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Harbor View Lodge', 'Business District', 707.0, 'Jl8j8onEalzoEHpIWwzS', 1236.0458437391801),
('Harbor View Lodge', 'Business District', 888.0, 'EMlhjaJGcas62w2ttZd3', 1573.55712271238008),
('Harbor View Lodge', 'Business District', 246.0, 'qSMxFiLCob3JRqDxEeGU', 871.70894159191505),
('Harbor View Lodge', 'Business District', 707.0, '9W2oMhyhbq8nMUKzKEHx', 527.66888168775904),
('Harbor View Lodge', 'Business District', 888.0, 'lUXo4tn31kxWDs587NyC', 208.111306080911987),
('Harbor View Lodge', 'Business District', 246.0, 'udGMDfhrfSILlX5OQlsj', 2327.7999028767299),
('Harbor View Lodge', 'Business District', 707.0, 'yqZWY6z4kuF5Vo8fLgqK', 441.96521011555501),
('Harbor View Lodge', 'Business District', 888.0, 'Xvnzh6wNlo7p4Kjt2HTr', 3977.65293192734998),
('Harbor View Lodge', 'Business District', 246.0, 'ekjT7GB3kfbUcIOCaLkT', 402.819942331057973),
('Harbor View Lodge', 'Business District', 707.0, 'sWM850mRafOzLPeTYPlr', 729.048925427705967),
('Harbor View Lodge', 'Business District', 888.0, 'wTtWBfZIxsUmC5hqzZop', 2023.40023200721998),
('Harbor View Lodge', 'Business District', 246.0, '5CYvmriRYcQtyRE2zdvF', 3309.19562337866),
('Harbor View Lodge', 'Business District', 707.0, 'QkxKt3fmzMwwbq6duwvL', 3986.28754845582989),
('Harbor View Lodge', 'Business District', 888.0, '85O2Ah76rYdRnqRQo3Ig', 616.127959955901019),
('Harbor View Lodge', 'Business District', 246.0, 'm3F8ts65oSLInS3w7Hu9', 1991.37583360594999);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Lakeside Manor', 'Historic Downtown', 111.0, '3fTjSW1kaGQzWIhQMiYU', 3950.52790350978012),
('Lakeside Manor', 'Historic Downtown', 234.0, '36r7TDGNPO11OjLek2tU', 323.766876348033009),
('Lakeside Manor', 'Historic Downtown', 579.0, 'bcB947K3eFZmPIP4xobe', 2503.45373624013018),
('Lakeside Manor', 'Historic Downtown', 111.0, 'e44Z0QcsNqIU5rHYlYGb', 3754.44841262827003),
('Lakeside Manor', 'Historic Downtown', 234.0, 'mQbBWeA3w4CrJG5wrJO0', 550.435511636499996),
('Lakeside Manor', 'Historic Downtown', 579.0, 'FGGEtzXgsYcNlyKHXeke', 3876.40716498278016),
('Lakeside Manor', 'Historic Downtown', 111.0, '4nvfAfdiJg9aI9I3N3aU', 2238.32478635664984),
('Lakeside Manor', 'Historic Downtown', 234.0, 'Bu5dyfqq8qtCp7If58YZ', 742.256441827463959),
('Lakeside Manor', 'Historic Downtown', 579.0, '0gDYzu5K6Gwce3OxLrrM', 2928.03686479087992),
('Lakeside Manor', 'Historic Downtown', 111.0, 'I1xLud7dcdYWXDVpqxVy', 1980.55032111911009),
('Lakeside Manor', 'Historic Downtown', 234.0, 'RbJtUmPcz0JRDnZm96Dd', 1521.38957407216003),
('Lakeside Manor', 'Historic Downtown', 579.0, 'WUQgpsLaxKpFHwCMPR9h', 3249.23604528411988),
('Lakeside Manor', 'Historic Downtown', 111.0, 'LU4uja6kp5rjtE0hcr3Q', 3093.9339285364199),
('Lakeside Manor', 'Historic Downtown', 234.0, 'gNiL3dIb1J3IXOegfoWw', 1974.41702291755996),
('Lakeside Manor', 'Historic Downtown', 579.0, 'q0OAyoFyLxbi9uIACeMJ', 3222.38138306094015);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Mountain Retreat', 'Lakeside Retreat', 505.0, 'xC0BU2vhKJyTMMAmsFVP', 2444.60535317406993),
('Mountain Retreat', 'Lakeside Retreat', 666.0, '2920d78f3bPglAolRD4J', 1146.96182546135992),
('Mountain Retreat', 'Lakeside Retreat', 789.0, 'PkKHc264vSqGhwqKAQO8', 2099.90956415782011),
('Mountain Retreat', 'Lakeside Retreat', 505.0, 'u7dH9KBvmewAp5eW4Mzc', 2042.4960088523701),
('Mountain Retreat', 'Lakeside Retreat', 666.0, 'VGhtNh64xzklNfmZw8qh', 1545.27015880361),
('Mountain Retreat', 'Lakeside Retreat', 789.0, 'xcwhUnzHm44X6wA5DLts', 728.38519310077595),
('Mountain Retreat', 'Lakeside Retreat', 505.0, 'kA5Ov7NopJaaiyjAMRq6', 3170.49001616828991),
('Mountain Retreat', 'Lakeside Retreat', 666.0, 'HxOx6cGzLDP6FNOwotjm', 3461.29564265037016),
('Mountain Retreat', 'Lakeside Retreat', 789.0, '4k2I8v43GxAugxAAC3U2', 1407.87788113436),
('Mountain Retreat', 'Lakeside Retreat', 505.0, '863U4uYsKVvhrmGFwLAg', 2444.52986052396),
('Mountain Retreat', 'Lakeside Retreat', 666.0, 'trYslk2hFtRcKiLVYFtE', 1760.1118643529901),
('Mountain Retreat', 'Lakeside Retreat', 789.0, 'U4jNcpGjhCB84roRfUr8', 1588.32956748565994),
('Mountain Retreat', 'Lakeside Retreat', 505.0, 'lN8QNjKNkO8vNi2R42u1', 954.848468630670027),
('Mountain Retreat', 'Lakeside Retreat', 666.0, 'WZRdQL1h11DgTpeXGiBY', 793.551903916624951),
('Mountain Retreat', 'Lakeside Retreat', 789.0, 'H1CyKtl2DNInmg35JtfP', 2247.95577334020982);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Ocean View Inn', 'City Center', 404.0, 'LqQNdrIiTN7ROcpg8iE1', 3261.25833961496983),
('Ocean View Inn', 'City Center', 555.0, 'XFUIabpxAaGuIAXktvBr', 1945.25540529390992),
('Ocean View Inn', 'City Center', 678.0, 'I1bcWBSod45c0xmUsGNP', 561.295036792387009),
('Ocean View Inn', 'City Center', 404.0, 'uGptZvPoJxovF9zfWg3x', 1523.6662471448501),
('Ocean View Inn', 'City Center', 555.0, 'YxnfpTUq58TsuObHS930', 3769.50535876361982),
('Ocean View Inn', 'City Center', 678.0, '8SNxOyOJGqiAaCHw98Af', 1596.90510022596004),
('Ocean View Inn', 'City Center', 404.0, 'sXAA8LfPhVCYWxoB2PPq', 3589.31422374204021),
('Ocean View Inn', 'City Center', 555.0, 'VLwlG4etfh77ImFAP3b0', 1475.50003940226998),
('Ocean View Inn', 'City Center', 678.0, '1eLcENmfeNukiVYFJEIf', 1136.32672863343009),
('Ocean View Inn', 'City Center', 404.0, 'DGXr1UAgyNYSZa0guYwv', 3086.75781677412988),
('Ocean View Inn', 'City Center', 555.0, '2VlXghqpDFMKlJIvHueQ', 3465.34717689658009),
('Ocean View Inn', 'City Center', 678.0, 'WyXtaZVUs7HUl81R5rZS', 3418.99805759358014),
('Ocean View Inn', 'City Center', 404.0, 'tm1U67CB62JcIM8pjQRP', 845.684087877094044),
('Ocean View Inn', 'City Center', 555.0, 'qjahIfKdWz4fBfSa9aiW', 1900.67259811173994),
('Ocean View Inn', 'City Center', 678.0, 'PFcehlsoSJOlMS28CmHb', 1771.99296863613995);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Palm Paradise Resort', 'Mountain Lodge', 808.0, 'wJask8Hy0GpfTb0Gg8OJ', 1645.9286375721199),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, '5AcZSeuHYdt9iuJJ4dU6', 2260.73527658498006),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, 'd0f9QKHDhGIFsW9Xh6nQ', 1033.19167342681999),
('Palm Paradise Resort', 'Mountain Lodge', 808.0, 'ST0kh9KX8NGyauZecwsd', 2160.43246013548014),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, 'CKA5OtAaLnMN6UD5FtCE', 2109.89348570831999),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, 'vFTBEhHXtuVqH86y27pI', 3986.12681576192017),
('Palm Paradise Resort', 'Mountain Lodge', 808.0, '7hW7BECO2C3WRSw0AC5G', 374.388616651170992),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, '6g1SIwkRdBC7tFw4cU13', 1099.37456365519006),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, 'YfhaO5Hj5WiSwsTOf2Bz', 1144.25771286634995),
('Palm Paradise Resort', 'Mountain Lodge', 808.0, 'od6islsDwxAQ6teIj4KD', 3772.53209914611989),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, 'u46Hu6eyLSYYXkx0cRAh', 569.179204040771992),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, 'FuaNzhGttSopMVJXPCKl', 822.561352234303968),
('Palm Paradise Resort', 'Mountain Lodge', 808.0, 'LNSS5Kvd0nTMROqRKtfK', 245.631362159224011),
('Palm Paradise Resort', 'Mountain Lodge', 999.0, '1YhCc7moVCKD67xtEuR8', 1070.36200102719999),
('Palm Paradise Resort', 'Mountain Lodge', 135.0, '9bJIId4IZlHSeAOjdkvd', 1910.14852842878008);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Royal Palace', 'Mountain Lodge', 303.0, 'PggdkEHx57yHVNQrxAxH', 2692.08978682146017),
('Royal Palace', 'Mountain Lodge', 444.0, 'pa397cmx39IIzRamJO2G', 3481.42913062116986),
('Royal Palace', 'Mountain Lodge', 567.0, '3JzoRHqplpXZZFcjukPq', 806.307301327506025),
('Royal Palace', 'Mountain Lodge', 303.0, '4d5FDnpIo0rL0HvyyKLJ', 1955.91199223392005),
('Royal Palace', 'Mountain Lodge', 444.0, 'rrdwKyTMqwcpob2Pw4Nx', 1303.17369171621999),
('Royal Palace', 'Mountain Lodge', 567.0, 't8mPXkXGdPzKoEKSngrD', 3455.05426448898015),
('Royal Palace', 'Mountain Lodge', 303.0, 'FhYWKSYm1yhRVoFBdc08', 2141.54764493406992),
('Royal Palace', 'Mountain Lodge', 444.0, 'AhJKZKd6mb4X9OX6MMzg', 1377.24446795683002),
('Royal Palace', 'Mountain Lodge', 567.0, 'WqVrhrutiJOOvFXLrHna', 606.843598510350944),
('Royal Palace', 'Mountain Lodge', 303.0, 'eNmCLHb1pfGiCLdQRTUB', 2884.99295248892986),
('Royal Palace', 'Mountain Lodge', 444.0, 'iwlWbhZdfMQydbJDTDQg', 3545.9163383278501),
('Royal Palace', 'Mountain Lodge', 567.0, 'KFKLtVIyLt8sTQEUnWGK', 1031.90222799011008),
('Royal Palace', 'Mountain Lodge', 303.0, '1urCVklJ8DYtOlHvQhDU', 2959.04592604013988),
('Royal Palace', 'Mountain Lodge', 444.0, 'b06dPc0xgQROemPhHdmO', 247.724024168184002),
('Royal Palace', 'Mountain Lodge', 567.0, 'J3nnqUyWvh93EFs5KUeK', 3480.80177206015014);
INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Silver Star Hotel', 'Beach Resort', 909.0, 'B2NM8elQkaBzNmcaclNi', 1119.9827214495599),
('Silver Star Hotel', 'Beach Resort', 123.0, '1JbbJYSLTHbudgdpVQ9u', 2747.5320694000402),
('Silver Star Hotel', 'Beach Resort', 468.0, 'aWKB4f5hLCW7tbs15lcV', 3217.15585804039983),
('Silver Star Hotel', 'Beach Resort', 909.0, 'IDkkLHazAgchAobtpVOU', 252.795337799692987),
('Silver Star Hotel', 'Beach Resort', 123.0, 'jSfJAwOkS5ctCWwYtMkZ', 899.642237440580971),
('Silver Star Hotel', 'Beach Resort', 468.0, '9cOCyChROSUDhm2IkhyC', 590.099044093747011),
('Silver Star Hotel', 'Beach Resort', 909.0, '8xAvm9EEsAjhm35AdhTW', 2832.82576201928987),
('Silver Star Hotel', 'Beach Resort', 123.0, 'jpJ0VvajeLSie920mHZN', 2588.94282361748992),
('Silver Star Hotel', 'Beach Resort', 468.0, 'Wf0NVogEQO3WwxmeDman', 3427.1088977907998),
('Silver Star Hotel', 'Beach Resort', 909.0, 'JWGN7vowdmu76VFJQmaG', 1102.39703318011993),
('Silver Star Hotel', 'Beach Resort', 123.0, 'rWv2aFvW94APBLJJ8fiS', 881.655001343651975),
('Silver Star Hotel', 'Beach Resort', 468.0, 'BQOM5XH7EMfFC32nXr9N', 2904.0954391923101),
('Silver Star Hotel', 'Beach Resort', 909.0, 'FN8EeLevIGQFpr06dA51', 3349.19693984940977),
('Silver Star Hotel', 'Beach Resort', 123.0, '2bVxtgYP1hs6Hm49ALOz', 2828.58436866112015),
('Silver Star Hotel', 'Beach Resort', 468.0, '2IavpGEVAOUY1Gz0T92e', 2940.06067634306009);

INSERT INTO sistel.room_facilities (hotel_name, hotel_branch, rnum, id, distance) VALUES
('Sunset Resort', 'Business District', 202.0, '7xzLrJ75SCCpDTLecEsl', 462.267592158464993),
('Sunset Resort', 'Business District', 333.0, 'Uz0TeQkq0UwkMBHRZK6M', 532.994710908973047),
('Sunset Resort', 'Business District', 456.0, 'KMLdcuEiWUNDVBgZ8tNy', 1589.71273437694003),
('Sunset Resort', 'Business District', 202.0, 'qcuUnKxw3yNVtu9dW3Uo', 1566.38537448819989),
('Sunset Resort', 'Business District', 333.0, 'artOvLAu0oG2ObTQU3Ym', 1709.30789101049004),
('Sunset Resort', 'Business District', 456.0, 'Ej3E58qQL9p0vO2tMS9O', 1073.61408474419),
('Sunset Resort', 'Business District', 202.0, 'QEFjMTBbVyvaltvzFgUg', 2586.94285158374987),
('Sunset Resort', 'Business District', 333.0, '9LS664RImZrMS7XKGbdd', 666.893926610418021),
('Sunset Resort', 'Business District', 456.0, 'za3oyqSJjP4LflFoG80P', 2883.67744095928992),
('Sunset Resort', 'Business District', 202.0, 'u7zK1EcYrqPfComVlwFN', 512.021218201326974),
('Sunset Resort', 'Business District', 333.0, 'nV2ffJuWiXX3FoF0Y3ce', 1453.05001978254995),
('Sunset Resort', 'Business District', 456.0, '65builoSTBgXAkbOGihp', 477.653154612801018),
('Sunset Resort', 'Business District', 202.0, 'FT5rSrXrawu2GId9A6QY', 1983.62680923071002),
('Sunset Resort', 'Business District', 333.0, 'HTsRZ2YJIrrgejFvrpnO', 3367.38670337082021),
('Sunset Resort', 'Business District', 456.0, 'LvAuuYaVn0ptRNc0jFKE', 2177.55246116035005);




--
-- Data for Name: shuttle_driver; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel.shuttle_driver ("Payment_id", "Phone_num") FROM stdin;
772-98-9032     83524776473.0
581-49-0243     89887675743.0
352-24-9420     85243613416.0
839-50-0348     82636153679.0
740-71-8191     82742641672.0
\.
*/

INSERT INTO sistel.shuttle_driver ("Payment_id", "Phone_num") VALUES
('772-98-9032', 83524776473.0),
('581-49-0243', 89887675743.0),
('352-24-9420', 85243613416.0),
('839-50-0348', 82636153679.0),
('740-71-8191', 82742641672.0);



--
-- Data for Name: shuttle_services; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.shuttle_services (driver_phonenum, vehicle_platnum) FROM stdin;
\.
*/


--
-- Data for Name: special_day_promo; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.special_day_promo (id, date) FROM stdin;
AB3cE2dF1gH5iJ7kL9mNoQpR        2023-05-26
XyZaB8cDE3Fg4HiJ0Km1Np2 2023-11-19
T2uVwY4zABcDe6FGhIj8Kl  2023-07-30
qRu5sTgH3iVjWk9LmNxY    2023-10-05
O7pQrS0tUvW1xYzAB2C3D   2023-01-15
V4E5FgHi6JkLmNoP7QsT    2023-08-04
D8E0FgHiJ1K2L4M5NpQR    2023-06-03
oS7T9vW0xYzABcDfGhIj    2023-06-17
2Kl3mNp5qRsTuVwXyZaBc   2023-05-14
uD1E4F5gHi6JkLmNoP      2023-09-08
\.
*/

INSERT INTO sistel.special_day_promo (id, date) VALUES
('AB3cE2dF1gH5iJ7kL9mNoQpR', '2023-05-26'),
('XyZaB8cDE3Fg4HiJ0Km1Np2', '2023-11-19'),
('T2uVwY4zABcDe6FGhIj8Kl', '2023-07-30'),
('qRu5sTgH3iVjWk9LmNxY', '2023-10-05'),
('O7pQrS0tUvW1xYzAB2C3D', '2023-01-15'),
('V4E5FgHi6JkLmNoP7QsT', '2023-08-04'),
('D8E0FgHiJ1K2L4M5NpQR', '2023-06-03'),
('oS7T9vW0xYzABcDfGhIj', '2023-06-17'),
('2Kl3mNp5qRsTuVwXyZaBc', '2023-05-14'),
('uD1E4F5gHi6JkLmNoP', '2023-09-08');



--
-- Data for Name: user; Type: TABLE DATA; Schema: sistel; Owner: db2304
--

/*
COPY sistel."user" (email, password, fname, lname) FROM stdin;
igillum0@wix.com        oXZd4Xa2        Isaiah  Gillum
gkernan1@devhub.com     YkKczZ9d        Gwenny  Kernan
hmcausland2@photobucket.com     wcIifRzx        Hana    McAusland
jcobb3@godaddy.com      Z2AioRIk        Jacinthe        Cobb
vrebichon4@is.gd        J9Bp7L5W        Veronica        Rebichon
bbye5@tripadvisor.com   KxuFa7df        Bradan  Bye
scassely6@hexun.com     UTXR4qQN        Stanly  Cassely
jfoulgham7@delicious.com        uiX8Hl7r        Jorgan  Foulgham
cklaiser8@wikipedia.org X4cq9MSC        Chilton Klaiser
afigger9@odnoklassniki.ru       y2TVaK1W        Adelina Figger
agrinta@jigsy.com       GZ3WPpjK        Allayne Grint
jmanchesterb@sciencedaily.com   2nwXwoix        Jackie  Manchester
hlettucec@wiley.com     jtNds6nW        Hagan   Lettuce
cmcasparand@comcast.net KkvZkEgQ        Candide Mcasparan
rgeraldeze@timesonline.co.uk    90d9wuC3        Ruperta Geraldez
jmurrisonf@weibo.com    jBcwusVB        Junette Murrison
sstocking@comcast.net   MYWbWtlY        Spencer Stockin
ffearnallh@dyndns.org   jICjWHtw        Flo     Fearnall
kdrayei@mozilla.org     jDKiltgu        Kalinda Draye
tzimaj@china.com.cn     cp51V4k2        Teriann Zima
mgrimsterk@unicef.org   sBFNxphk        Mel     Grimster
bengehaml@sohu.com      VFgEIUrd        Bernetta        Engeham
rmacgibbonm@icq.com     EMcYfCTH        Reg     MacGibbon
csheabern@about.com     UdHDlKEv        Cassandre       Sheaber
enibleyo@bizjournals.com        EsvF2puU        Emlyn   Nibley
eslavinp@opensource.org BYVN1a6t        Eddi    Slavin
rbillsq@amazon.co.jp    qSFYE681        Reinhold        Bills
spalffyr@nytimes.com    JdNE9IOk        Sherman Palffy
abloodworthes@cnn.com   I14kMIJu        Avictor Bloodworthe
rbrooksont@barnesandnoble.com   t5heyWIl        Renaud  Brookson
elewzeyu@epa.gov        TznsVbdx        Emmerich        Lewzey
swhiteselv@indiatimes.com       ItfJtfO1        Simon   Whitesel
slagnew@craigslist.org  NPxAJsVM        Stillman        Lagne
fdampierx@opensource.org        n40Buw7K        Fraze   Dampier
abarlassy@histats.com   8TnzPSkg        Astrid  Barlass
pwoolgerz@behance.net   X4NObFSy        Pasquale        Woolger
ttitterrell10@exblog.jp 8g6zgeVb        Trisha  Titterrell
cwoollin11@domainmarket.com     TuO3zWOv        Corabella       Woollin
ufearnyhough12@digg.com fAAV5Plp        Ula     Fearnyhough
ttottle13@utexas.edu    9fzRqT5B        Torr    Tottle
trosenhaupt14@businesswire.com  Tw5mPtBB        Trevor  Rosenhaupt
abrasier15@e-recht24.de a2clLMNs        Avis    Brasier
imacmichael16@hud.gov   VnpEfgWS        Isak    MacMichael
lgresty17@zimbio.com    xF6zIXWJ        Lindsay Gresty
dmatuszkiewicz18@whitehouse.gov yOj9O9MM        Dolf    Matuszkiewicz
mbowle19@geocities.com  boef7p39        Merell  Bowle
bpainten1a@cafepress.com        l3nh9MNF        Blaine  Painten
rbarok1b@dot.gov        WxuwrXpA        Rice    Barok
kbirkhead1c@tiny.cc     FFKmKLwo        Kristofer       Birkhead
bcroose1d@sourceforge.net       iYq3S3Mr        Broderic        Croose
\.
*/

INSERT INTO sistel."user" (email, password, fname, lname) VALUES
('igillum0@wix.com', 'oXZd4Xa2', 'Isaiah', 'Gillum'),
('gkernan1@devhub.com', 'YkKczZ9d', 'Gwenny', 'Kernan'),
('hmcausland2@photobucket.com', 'wcIifRzx', 'Hana', 'McAusland'),
('jcobb3@godaddy.com', 'Z2AioRIk', 'Jacinthe', 'Cobb'),
('vrebichon4@is.gd', 'J9Bp7L5W', 'Veronica', 'Rebichon'),
('bbye5@tripadvisor.com', 'KxuFa7df', 'Bradan', 'Bye'),
('scassely6@hexun.com', 'UTXR4qQN', 'Stanly', 'Cassely'),
('jfoulgham7@delicious.com', 'uiX8Hl7r', 'Jorgan', 'Foulgham'),
('cklaiser8@wikipedia.org', 'X4cq9MSC', 'Chilton', 'Klaiser'),
('afigger9@odnoklassniki.ru', 'y2TVaK1W', 'Adelina', 'Figger'),
('agrinta@jigsy.com', 'GZ3WPpjK', 'Allayne', 'Grint'),
('jmanchesterb@sciencedaily.com', '2nwXwoix', 'Jackie', 'Manchester'),
('hlettucec@wiley.com', 'jtNds6nW', 'Hagan', 'Lettuce'),
('cmcasparand@comcast.net', 'KkvZkEgQ', 'Candide', 'Mcasparan'),
('rgeraldeze@timesonline.co.uk', '90d9wuC3', 'Ruperta', 'Geraldez'),
('jmurrisonf@weibo.com', 'jBcwusVB', 'Junette', 'Murrison'),
('sstocking@comcast.net', 'MYWbWtlY', 'Spencer', 'Stockin'),
('ffearnallh@dyndns.org', 'jICjWHtw', 'Flo', 'Fearnall'),
('kdrayei@mozilla.org', 'jDKiltgu', 'Kalinda', 'Draye'),
('tzimaj@china.com.cn', 'cp51V4k2', 'Teriann', 'Zima'),
('mgrimsterk@unicef.org', 'sBFNxphk', 'Mel', 'Grimster'),
('bengehaml@sohu.com', 'VFgEIUrd', 'Bernetta', 'Engeham'),
('rmacgibbonm@icq.com', 'EMcYfCTH', 'Reg', 'MacGibbon'),
('csheabern@about.com', 'UdHDlKEv', 'Cassandre', 'Sheaber'),
('enibleyo@bizjournals.com', 'EsvF2puU', 'Emlyn', 'Nibley'),
('eslavinp@opensource.org', 'BYVN1a6t', 'Eddi', 'Slavin'),
('rbillsq@amazon.co.jp', 'qSFYE681', 'Reinhold', 'Bills'),
('spalffyr@nytimes.com', 'JdNE9IOk', 'Sherman', 'Palffy'),
('abloodworthes@cnn.com', 'I14kMIJu', 'Avictor', 'Bloodworthe'),
('rbrooksont@barnesandnoble.com', 't5heyWIl', 'Renaud', 'Brookson'),
('elewzeyu@epa.gov', 'TznsVbdx', 'Emmerich', 'Lewzey'),
('swhiteselv@indiatimes.com', 'ItfJtfO1', 'Simon', 'Whitesel'),
('slagnew@craigslist.org', 'NPxAJsVM', 'Stillman', 'Lagne'),
('fdampierx@opensource.org', 'n40Buw7K', 'Fraze', 'Dampier'),
('abarlassy@histats.com', '8TnzPSkg', 'Astrid', 'Barlass'),
('pwoolgerz@behance.net', 'X4NObFSy', 'Pasquale', 'Woolger'),
('ttitterrell10@exblog.jp', '8g6zgeVb', 'Trisha', 'Titterrell'),
('cwoollin11@domainmarket.com', 'TuO3zWOv', 'Corabella', 'Woollin'),
('ufearnyhough12@digg.com', 'fAAV5Plp', 'Ula', 'Fearnyhough'),
('ttottle13@utexas.edu', '9fzRqT5B', 'Torr', 'Tottle'),
('trosenhaupt14@businesswire.com', 'Tw5mPtBB', 'Trevor', 'Rosenhaupt'),
('abrasier15@e-recht24.de', 'a2clLMNs', 'Avis', 'Brasier'),
('imacmichael16@hud.gov', 'VnpEfgWS', 'Isak', 'MacMichael'),
('lgresty17@zimbio.com', 'xF6zIXWJ', 'Lindsay', 'Gresty'),
('dmatuszkiewicz18@whitehouse.gov', 'yOj9O9MM', 'Dolf', 'Matuszkiewicz'),
('mbowle19@geocities.com', 'boef7p39', 'Merell', 'Bowle'),
('bpainten1a@cafepress.com', 'l3nh9MNF', 'Blaine', 'Painten'),
('rbarok1b@dot.gov', 'WxuwrXpA', 'Rice', 'Barok'),
('kbirkhead1c@tiny.cc', 'FFKmKLwo', 'Kristofer', 'Birkhead'),
('bcroose1d@sourceforge.net', 'iYq3S3Mr', 'Broderic', 'Croose');


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: sistel; Owner: db2304
--
/*
COPY sistel.vehicle (platnum, vehicle_brand, vehicle_type) FROM stdin;
PlateNum        Vehicle_brand   Vehicle_type
GH1782PO        Suzuki  Car
BL9872 IJ       Ford    Car
B9281LL Honda   Car
WA6638KR        Yamaha  Car
YE1234AH        Toyota  Car
\.
*/

INSERT INTO sistel.vehicle (platnum, vehicle_brand, vehicle_type) VALUES
('GH1782PO', 'Suzuki', 'Car'),
('BL9872 IJ', 'Ford', 'Car'),
('B9281LL', 'Honda', 'Car'),
('WA6638KR', 'Yamaha', 'Car'),
('YE1234AH', 'Toyota', 'Car');


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (email);


--
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (email);


--
-- Name: debit debit_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.debit
    ADD CONSTRAINT debit_pkey PRIMARY KEY (no_rekening);


--
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (phonenum);


--
-- Name: ewallet ewallet_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.ewallet
    ADD CONSTRAINT ewallet_pkey PRIMARY KEY (phone_num);


--
-- Name: holiday_promo holiday_promo_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.holiday_promo
    ADD CONSTRAINT holiday_promo_pkey PRIMARY KEY (id);


--
-- Name: hotel_facilities hotel_facilities_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_facilities
    ADD CONSTRAINT hotel_facilities_pkey PRIMARY KEY (hotel_name, hotel_branch, facility_name);


--
-- Name: hotel_gives_promo hotel_gives_promo_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_gives_promo
    ADD CONSTRAINT hotel_gives_promo_pkey PRIMARY KEY (promo_id);


--
-- Name: hotel_nearbyplaces hotel_nearbyplaces_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_nearbyplaces
    ADD CONSTRAINT hotel_nearbyplaces_pkey PRIMARY KEY (hotel_name, hotel_branch, place_name, distance);


--
-- Name: hotel hotel_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (hotel_name, hotel_branch);


--
-- Name: kredit kredit_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.kredit
    ADD CONSTRAINT kredit_pkey PRIMARY KEY (no_kartu);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- Name: promo promo_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.promo
    ADD CONSTRAINT promo_pkey PRIMARY KEY (id);


--
-- Name: reservation_actor reservation_actor_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_actor
    ADD CONSTRAINT reservation_actor_pkey PRIMARY KEY (email);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (rid);


--
-- Name: reservation_room reservation_room_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_room
    ADD CONSTRAINT reservation_room_pkey PRIMARY KEY (rsv_id);


--
-- Name: reservation_shuttleservice reservation_shuttleservice_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_shuttleservice
    ADD CONSTRAINT reservation_shuttleservice_pkey PRIMARY KEY (rsv_id);


--
-- Name: reservation_status_history reservation_status_history_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_status_history
    ADD CONSTRAINT reservation_status_history_pkey PRIMARY KEY (rid, rsid, datetime);


--
-- Name: reservation_status reservation_status_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_status
    ADD CONSTRAINT reservation_status_pkey PRIMARY KEY (id);


--
-- Name: reservation_use_promo reservation_use_promo_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_use_promo
    ADD CONSTRAINT reservation_use_promo_pkey PRIMARY KEY (rid);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: room_facilities room_facilities_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.room_facilities
    ADD CONSTRAINT room_facilities_pkey PRIMARY KEY (hotel_name, hotel_branch, rnum, id);


--
-- Name: room room_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (hotel_name, hotel_branch, number);


--
-- Name: shuttle_services shuttle_services_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.shuttle_services
    ADD CONSTRAINT shuttle_services_pkey PRIMARY KEY (driver_phonenum);


--
-- Name: special_day_promo special_day_promo_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.special_day_promo
    ADD CONSTRAINT special_day_promo_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (email);


--
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (platnum);


--
-- Name: admin admin_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.admin
    ADD CONSTRAINT admin_email_fkey FOREIGN KEY (email) REFERENCES sistel."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: complaints complaints_cust_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.complaints
    ADD CONSTRAINT complaints_cust_email_fkey FOREIGN KEY (cust_email) REFERENCES sistel.customer(email);


--
-- Name: complaints complaints_rv_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.complaints
    ADD CONSTRAINT complaints_rv_id_fkey FOREIGN KEY (rv_id) REFERENCES sistel.reservation(rid);


--
-- Name: customer customer_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.customer
    ADD CONSTRAINT customer_email_fkey FOREIGN KEY (email) REFERENCES sistel.reservation_actor(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: debit debit_payment_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.debit
    ADD CONSTRAINT debit_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES sistel.payment(payment_id);


--
-- Name: ewallet ewallet_payment_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.ewallet
    ADD CONSTRAINT ewallet_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES sistel.payment(payment_id);


--
-- Name: reservation fk_customer_email; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation
    ADD CONSTRAINT fk_customer_email FOREIGN KEY (cust_email) REFERENCES sistel.customer(email);


--
-- Name: holiday_promo holiday_promo_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.holiday_promo
    ADD CONSTRAINT holiday_promo_id_fkey FOREIGN KEY (id) REFERENCES sistel.promo(id);


--
-- Name: hotel hotel_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel
    ADD CONSTRAINT hotel_email_fkey FOREIGN KEY (email) REFERENCES sistel.reservation_actor(email);


--
-- Name: hotel_facilities hotel_facilities_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_facilities
    ADD CONSTRAINT hotel_facilities_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch) REFERENCES sistel.hotel(hotel_name, hotel_branch);


--
-- Name: hotel_gives_promo hotel_gives_promo_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_gives_promo
    ADD CONSTRAINT hotel_gives_promo_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch) REFERENCES sistel.hotel(hotel_name, hotel_branch);


--
-- Name: hotel_gives_promo hotel_gives_promo_promo_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_gives_promo
    ADD CONSTRAINT hotel_gives_promo_promo_id_fkey FOREIGN KEY (promo_id) REFERENCES sistel.promo(id);


--
-- Name: hotel_nearbyplaces hotel_nearbyplaces_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.hotel_nearbyplaces
    ADD CONSTRAINT hotel_nearbyplaces_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch) REFERENCES sistel.hotel(hotel_name, hotel_branch);


--
-- Name: kredit kredit_payment_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.kredit
    ADD CONSTRAINT kredit_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES sistel.payment(payment_id);


--
-- Name: reservation_actor reservation_actor_admin_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_actor
    ADD CONSTRAINT reservation_actor_admin_email_fkey FOREIGN KEY (admin_email) REFERENCES sistel.admin(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservation_actor reservation_actor_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_actor
    ADD CONSTRAINT reservation_actor_email_fkey FOREIGN KEY (email) REFERENCES sistel."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservation reservation_payment_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation
    ADD CONSTRAINT reservation_payment_fkey FOREIGN KEY (payment) REFERENCES sistel.payment(payment_id);


--
-- Name: reservation_room reservation_room_rnum_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_room
    ADD CONSTRAINT reservation_room_rnum_fkey FOREIGN KEY (rnum, rhotelname, rhotelbranch) REFERENCES sistel.room(number, hotel_name, hotel_branch);


--
-- Name: reservation_room reservation_room_rsv_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_room
    ADD CONSTRAINT reservation_room_rsv_id_fkey FOREIGN KEY (rsv_id) REFERENCES sistel.reservation(rid);


--
-- Name: reservation_shuttleservice reservation_shuttleservice_driver_phonenum_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_shuttleservice
    ADD CONSTRAINT reservation_shuttleservice_driver_phonenum_fkey FOREIGN KEY (driver_phonenum) REFERENCES sistel.driver(phonenum);


--
-- Name: reservation_shuttleservice reservation_shuttleservice_rsv_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_shuttleservice
    ADD CONSTRAINT reservation_shuttleservice_rsv_id_fkey FOREIGN KEY (rsv_id) REFERENCES sistel.reservation(rid);


--
-- Name: reservation_shuttleservice reservation_shuttleservice_vehicle_num_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_shuttleservice
    ADD CONSTRAINT reservation_shuttleservice_vehicle_num_fkey FOREIGN KEY (vehicle_num) REFERENCES sistel.vehicle(platnum);


--
-- Name: reservation_status_history reservation_status_history_rid_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_status_history
    ADD CONSTRAINT reservation_status_history_rid_fkey FOREIGN KEY (rid) REFERENCES sistel.reservation(rid);


--
-- Name: reservation_status_history reservation_status_history_rsid_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_status_history
    ADD CONSTRAINT reservation_status_history_rsid_fkey FOREIGN KEY (rsid) REFERENCES sistel.reservation_status(id);


--
-- Name: reservation_use_promo reservation_use_promo_pid_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_use_promo
    ADD CONSTRAINT reservation_use_promo_pid_fkey FOREIGN KEY (pid) REFERENCES sistel.promo(id);


--
-- Name: reservation_use_promo reservation_use_promo_rid_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reservation_use_promo
    ADD CONSTRAINT reservation_use_promo_rid_fkey FOREIGN KEY (rid) REFERENCES sistel.reservation(rid);


--
-- Name: reviews reviews_cust_email_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reviews
    ADD CONSTRAINT reviews_cust_email_fkey FOREIGN KEY (cust_email) REFERENCES sistel.customer(email);


--
-- Name: reviews reviews_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.reviews
    ADD CONSTRAINT reviews_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch) REFERENCES sistel.hotel(hotel_name, hotel_branch);


--
-- Name: room_facilities room_facilities_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.room_facilities
    ADD CONSTRAINT room_facilities_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch, rnum) REFERENCES sistel.room(hotel_name, hotel_branch, number);


--
-- Name: room room_hotel_name_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.room
    ADD CONSTRAINT room_hotel_name_fkey FOREIGN KEY (hotel_name, hotel_branch) REFERENCES sistel.hotel(hotel_name, hotel_branch);


--
-- Name: shuttle_services shuttle_services_driver_phonenum_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.shuttle_services
    ADD CONSTRAINT shuttle_services_driver_phonenum_fkey FOREIGN KEY (driver_phonenum) REFERENCES sistel.driver(phonenum);


--
-- Name: shuttle_services shuttle_services_vehicle_platnum_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.shuttle_services
    ADD CONSTRAINT shuttle_services_vehicle_platnum_fkey FOREIGN KEY (vehicle_platnum) REFERENCES sistel.vehicle(platnum);


--
-- Name: special_day_promo special_day_promo_id_fkey; Type: FK CONSTRAINT; Schema: sistel; Owner: db2304
--

ALTER TABLE ONLY sistel.special_day_promo
    ADD CONSTRAINT special_day_promo_id_fkey FOREIGN KEY (id) REFERENCES sistel.promo(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

--REVOKE ALL ON SCHEMA public FROM PUBLIC;
--REVOKE ALL ON SCHEMA public FROM postgres;
--GRANT ALL ON SCHEMA public TO postgres;
--GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


`
const doSomething = async () => {
    try {
        const res = await query(schema);
        console.log(res)
        console.log('Skrip berhasil dijalankan.');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}
doSomething();
