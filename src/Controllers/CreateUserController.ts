import { CreateUserUseCase } from './../useCases/CreateUserUseCase';
import {Request , Response}from 'express';
import { IUser } from '../Models/IUserModel';

export class CreateUserController{

    constructor(private CreateUserUseCase:CreateUserUseCase){

    }

    async handle(req:Request,res:Response):Promise<Response<IUser>>{

        const {email ,name , avatar , password} = req.body as IUser


        const user = await this.CreateUserUseCase.execute({email , name , avatar , password})

        return res.status(201).json(user)
    }
}