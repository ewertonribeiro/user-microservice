
import { Router } from "express";
import { AuthMiddleware, UserMiddleware } from "../MIddlewares";
import { CreateSessionController } from "../Controllers";

export const SessionRoutes = Router()

interface IResponse{
        sub:string
}

SessionRoutes.post("/create/:id" , UserMiddleware.userDoesNotExists, (req,res)=>{
        CreateSessionController.handle(req,res)
}  )

SessionRoutes.delete("/endsession" , (req,res)=>{
    
})


