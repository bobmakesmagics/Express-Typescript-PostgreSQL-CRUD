import { Pool } from 'pg';
import pool from '../src/db';

require('dotenv').config();

const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;

jest.mock('pg', () => {
  const originalModule = jest.requireActual('pg');
  return {
    __esModule: true,
    ...originalModule,
    Pool: jest.fn(),
  };
});

describe('PostgreSQL Pool Configuration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a PostgreSQL pool with correct configuration', () => {
    expect(Pool).toHaveBeenCalledWith({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DB,
      password: PG_PASSWORD,
      port: PG_PORT as unknown as number,
    });
  });

  it('should export the PostgreSQL pool instance', () => {
    expect(pool).toBeInstanceOf(Pool);
  });
});
