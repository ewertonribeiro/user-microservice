import { Password } from '../Functions/Password';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';

interface IRequest{
    id:string,
    password:number
}

interface IResponse{
    name:string,
    status:string
}
export class EndSessionUseCase{

    constructor(private UserRepository:UserRepository){}

    async execute({password , id}:IRequest):Promise<IResponse>{


        if(!password){
            throw new Error("You must Provide a Password")
        }
        const pass = password.toString();


            const user = await this.UserRepository.findUserById(id)

            if(!user){
                throw new Error("User does Not Exists")
            }
    
            const passCompare = await Password.Compare(pass , user.password)

        if(!passCompare){

            throw new Error("Password Invalid")
        }

        const {data}= await this.UserRepository.endSession(id)

        const response = data?.find(user=>user);


        const IResponse = {
            name:`${response?.name} ${response?.lastname}`,
            status:"Token Deleted"
        } as IResponse

        return IResponse

    }
}