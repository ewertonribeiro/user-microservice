import  {Router} from 'express'
import { ListAllUsercontroller , CreateuserController  , FindUserByEmailController, UpdatePasswordController, DeleteUserController} from '../Controllers';
import {UserMiddleware} from '../MIddlewares/UserMiddleware'


export const userRoutes = Router();


userRoutes.get("/listall" , (req,res)=>{
            ListAllUsercontroller.handle(req,res)
})

userRoutes.get("/:email" , UserMiddleware.userDoesNotExists,(req,res)=>{
    FindUserByEmailController.handle(req,res)
})

userRoutes.post("/create",UserMiddleware.userAlredyExists , (req,res)=>{
    CreateuserController.handle(req,res)
})

userRoutes.put("/update/:email" ,UserMiddleware.userDoesNotExists, (req,res)=>{
    UpdatePasswordController.handle(req,res)
 })


userRoutes.delete("/delete/:id" ,UserMiddleware.userDoesNotExists ,  (req,res)=>{
    DeleteUserController.handle(req,res)
})

    
