import { SessionRoutes } from './Routes/Session.routes';
import express from 'express'
import dotenv from 'dotenv'
import {userRoutes} from './Routes/User.routes'

dotenv.config()

import "./DB/InitDB"

const port = process.env.PORT

const server = express()

server.use(express.json())

server.use("/session",SessionRoutes)

server.use("/users" , userRoutes)

server.listen(port , ()=> {
    console.log(`Server is listenning on ${port}`)
    console.log("Supabase Connected")

} )