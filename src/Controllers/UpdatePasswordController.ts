
import { Request, Response } from 'express';
import { UpdatePasswordUseCase } from './../useCases/UpdatePasswordUseCase';
import { IUser } from '../Models/IUserModel';

interface IUpdatePassword{
    email:string,
    password:number,
    newpassword:number
}

export class UpdatePasswordController{


    constructor(private UpdatePasswordUseCase:UpdatePasswordUseCase){}


    async handle(req:Request<unknown> , res:Response):Promise<Response<IUser>>{
        const {email} = req.params as IUpdatePassword
        const { password , newpassword} = req.body as IUpdatePassword

        try{
            const Password = await this.UpdatePasswordUseCase.execute({email ,password , newpassword}) 

            return res.status(200).json(Password)
        }

        catch(err){
            return res.json({error:`${err}`})
        }


    }



}