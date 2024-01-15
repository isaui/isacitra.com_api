import pool from "./pool.js"

const query = async (queryString) => {
   const client =  await pool.connect();
   const res = await client.query(queryString);
   client.release()
   return res
}

export default query