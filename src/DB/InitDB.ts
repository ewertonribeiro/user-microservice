import { Pool } from 'pg';
import { config } from 'dotenv';

config();

export const db = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.HOST,
});

export default async function connectDb() {
  try {
    await db.connect();
    console.log('Db Connected');
  } catch (error) {
    console.log(error);
  }
}
