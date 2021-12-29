
import { json } from 'stream/consumers';
import { Password } from '../Functions/Password';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';

interface IResponse{
    name?:string,
    token?:string
}
interface IRequest{
    id:string,
    password:number
}
export class CreateSessionUseCase{

    constructor(private UserRepository:UserRepository){}


    async execute({password , id}:IRequest):Promise<IResponse>{

        const pass = password.toString()
       
        try{

            const user = await this.UserRepository.findUserById(id);
            
            if(!user){
                throw new Error("User does not exists!")
            }
        
            const passIsRigth = await Password.Compare(pass , user.password)
    
            if(!passIsRigth){
                throw new Error("Password invalid")
            }

            const {data} = await this.UserRepository.createSession(id);
    
            const Response = data?.find(user=>user)
    
            const newtoken = {
                name:Response?.name,
                token:Response?.token
            }
    
            return newtoken
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }
}