import { Pool } from "pg"
import { config } from 'dotenv'

config()

export const db = new Pool({
  user: "postgres",
  password: "postgres",
  database: "aluraflix_users"
})

export default async function connectDb() {
  try {
    await db.connect();
    console.log("Db Connected");
  } catch (error) {
    console.log(error)
  }
}
