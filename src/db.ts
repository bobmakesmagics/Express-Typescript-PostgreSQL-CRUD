import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_temp',
  password: '123456789',
  port: 5432, // or the port you are using for PostgreSQL
});

export default pool;
