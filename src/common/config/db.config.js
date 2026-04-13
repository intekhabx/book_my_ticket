import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: { rejectUnauthorized: false },
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});


export default pool;
