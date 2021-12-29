import { CreateUserUseCase } from './../useCases/CreateUserUseCase';
import {Request , Response}from 'express';
import { IUser } from '../Models/IUserModel';


interface IResponse{
    name?:string,
    email?:string,
    avatar?:string,
    id?:string,
    token:string
}
export class CreateUserController{

    constructor(private CreateUserUseCase:CreateUserUseCase){

    }

    async handle(req:Request,res:Response):Promise<Response<IResponse>>{

        const {email ,name , avatar , password , lastname} = req.body as IUser


        const user = await this.CreateUserUseCase.execute({email , name , avatar , password , lastname})
       

        const Response = {
            name:user?.name,
            email:user?.email,
            avatar:user.avatar,
            id:user?.id,
            token:user.token
        } as IResponse

        return res.status(201).json(Response)
    }
}