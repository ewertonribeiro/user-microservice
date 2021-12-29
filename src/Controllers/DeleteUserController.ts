import { Request, Response } from 'express';
import { IUser } from '../Models/IUserModel';
import { DeleteUserUseCase } from './../useCases/deleteUserUseCase';

interface IUserToDelete{
    id:string,
    password:number 
}
interface IResponse{
    userdeleted:string,
    status:string
}
export class DeleteUserController{

    constructor(private DeleteUserUseCase:DeleteUserUseCase){}


    async handle(req:Request<unknown>,res:Response):Promise<Response<IResponse>>{

        const {id} = req.params as IUserToDelete;
        const {password} = req.body as IUserToDelete

        try{
            const deleteUser = await this.DeleteUserUseCase.execute({id, password})

            const user = deleteUser.data?.find(user=>user)

            const Response = {
                userdeleted:`${user?.name} ${user?.lastname}`,
                status:deleteUser.statusText
            } as IResponse
            return res.json(Response)
        }
        catch(err){
            return res.status(400).json(`${err}`)
        }
    }
}