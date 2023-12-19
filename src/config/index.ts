import * as dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
  port: number;
  db_url: string;
}

const config: ServerConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  db_url:
    process.env.DATABASE_URL ??
    'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
};

export default config;
