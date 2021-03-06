import { FindUserByEmailUseCase } from './../useCases/FindUserByEmailUseCase';
import { Request , Response } from "express";
import { IUser } from "../Models/IUserModel";


export class FindUserByEmailController{


    constructor(private FindUserByEmailUseCase:FindUserByEmailUseCase){

    }

    async handle(req:Request<unknown> , res:Response):Promise<Response>{

    const {email} = req.params as IUser

    const user = await this.FindUserByEmailUseCase.execute(email);

    if(!user)return res.status(404).json({error:"User not found"})
    
    return res.status(200).json(user)

    }
}