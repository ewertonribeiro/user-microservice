import { Request, Response } from 'express';
import { EndSessionUseCase } from './../useCases/EndSessionUseCase';



interface IRequest{
    id:string,
    token:string,
    password:number
} 
interface IResponse{
    name:string,
    status:string
}
export class EndSessionController{

    constructor(private EndSessionUseCase:EndSessionUseCase){}

    async handle(req:Request<unknown> , res:Response):Promise<Response<IResponse>>{
        const {id} = req.params as IRequest
        const {password} = req.body as IRequest
        
        try{
            const user = await this.EndSessionUseCase.execute({password , id})

            return res.status(200).json(user)
        }

        catch(err){
            return res.status(400).json(`${err}`)
        }
    }
}