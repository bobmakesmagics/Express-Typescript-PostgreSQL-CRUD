import { Pool } from 'pg';
require('dotenv').config();

const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PASSWORD,
  port: PG_PORT as unknown as number,
});

export default pool;
