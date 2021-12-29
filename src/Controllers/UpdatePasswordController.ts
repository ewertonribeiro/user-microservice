
import { Request, Response } from 'express';
import { UpdatePasswordUseCase } from './../useCases/UpdatePasswordUseCase';
import { IUser } from '../Models/IUserModel';

interface IUpdatePassword{
    id:string,
    password:number,
    newpassword:number
}

interface IResponse{
    name:string,
    newpassword:string,
    status:string
}
export class UpdatePasswordController{


    constructor(private UpdatePasswordUseCase:UpdatePasswordUseCase){}


    async handle(req:Request<unknown> , res:Response):Promise<Response<IResponse>>{
        const {id} = req.params as IUpdatePassword
        const { password , newpassword} = req.body as IUpdatePassword

        try{
            const response= await this.UpdatePasswordUseCase.execute({id ,password , newpassword}) 

            const user = response.data?.find(user=>user)

            const Response = {
                name:user?.name,
                newpassword:user?.password,
                status:response.statusText
            } as IResponse

            return res.status(200).json(Response)
        }

        catch(err){
            return res.json({error:`${err}`})
        }


    }



}