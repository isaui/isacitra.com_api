import pool from "./pool"

const query = async (queryString) => {
   const client =  await pool.connect();
   const res = await client.query(queryString);
   client.release()
   return res
}

export default query