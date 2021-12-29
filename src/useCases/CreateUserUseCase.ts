import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from './../Models/IUserModel';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import {Password} from '../Functions/Password'

interface IResponseUser{
    name:string,
    lastname:string,
    email:string,
    token:string,
    id:string,
    avatar:string
}

export class CreateUserUseCase{


    constructor(private UserRepository:UserRepository){

    }



    async execute({password,email ,name ,avatar , lastname}:IUser):Promise<IResponseUser>{
        
        const hashPass = await Password.encrypt(password)

        const {data} = await this.UserRepository.createUser({avatar , name , email , password:hashPass , lastname})
        const user = data?.find(user=>user)

        const Response = {
            email:user?.email,
            name:user?.name,
            lastname:user?.lastname,
            token:user?.token,
            id:user?.id,
            avatar:user?.avatar
        } as IResponseUser

        return Response
    }
}