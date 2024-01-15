import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'viaduct.proxy.rlwy.net',
    database: 'railway',
    password: 'cA3BFCc4g2BGdCE15Fg3fG*112A5-b4-',
    port: 29766, // Port default PostgreSQL
  });
export default pool