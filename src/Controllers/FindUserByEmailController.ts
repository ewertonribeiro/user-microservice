import { FindUserByEmailUseCase } from './../useCases/FindUserByEmailUseCase';
import { Request , Response } from "express";
import { IUser } from "../Models/IUserModel";


export class FindUserByEmailController{


    constructor(private FindUserByEmailUseCase:FindUserByEmailUseCase){

    }

    async handle(req:Request<unknown> , res:Response):Promise<Response<IUser | undefined>>{

        const {email} = req.params as IUser

    const user = await this.FindUserByEmailUseCase.execute(email);

    if(user.data?.length === 0){
        return res.json({error:"User not found"})
    }
    
        return res.status(200).json(user)

    }
}