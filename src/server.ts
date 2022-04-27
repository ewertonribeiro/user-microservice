import { SessionRoutes } from './Routes/Session.routes';
import express from 'express'
import dotenv from 'dotenv'

import { userRoutes } from './Routes/User.routes'

dotenv.config()

import connectDb from './DB/InitDB';

async function connect() {
  await connectDb();
}

connect();

const port = process.env.PORT || 3000;

const server = express()

server.use(express.json())

server.use("/session", SessionRoutes)

server.use("/users", userRoutes)

server.listen(port, () => {
  console.log(`Server is listenning on ${port}`)

})
