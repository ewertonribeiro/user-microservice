import { Request, Response } from 'express';
import { IUser } from '../Models/IUserModel';
import { DeleteUserUseCase } from './../useCases/deleteUserUseCase';

interface IUserToDelete{
    id:string,
    password:number | string
}
export class DeleteUserController{

    constructor(private DeleteUserUseCase:DeleteUserUseCase){}


    async handle(req:Request<unknown>,res:Response):Promise<Response<IUser>>{

        const {id} = req.params as IUserToDelete;
        const {password} = req.body as IUserToDelete

        try{
            const deleteUser = await this.DeleteUserUseCase.execute({id, password})

            return res.json(deleteUser.statusText)
        }
        catch(err){
            return res.status(400).json({error:`${err}`})
        }




    }
}