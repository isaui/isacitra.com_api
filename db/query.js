import pool, { querySimulatorPool } from "./pool.js"

const query = async (queryString) => {
   const client =  await pool.connect();
   const res = await client.query(queryString);
   client.release()
   return res
}

const querySimulator = async (queryString) => {
   const client =  await querySimulatorPool.connect();
   const res = await client.query(queryString);
   client.release()
   return res
}

export {querySimulator}

export default query