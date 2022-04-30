import { Pool } from "pg"
import { config } from 'dotenv'

config()

export const db = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  password:process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB ||"aluraflix_users"
  
})

export default async function connectDb() {
  try {
    await db.connect();
    console.log("Db Connected");
  } catch (error) {
    console.log(error)
  }
}
