import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_temp',
  password: '123456789',
  port: 5432,
});

export default pool;
