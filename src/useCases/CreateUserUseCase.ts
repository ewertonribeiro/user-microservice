import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from './../Models/IUserModel';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import {Password} from '../Functions/Password'


export class CreateUserUseCase{


    constructor(private UserRepository:UserRepository){

    }



    async execute({password,email ,name ,avatar}:IUser):Promise<PostgrestResponse<IUser>>{

        const toString = password.toString()
        

        const hashPass = await Password.encrypt(password)

        const user = await this.UserRepository.createUser({avatar , name , email , password:hashPass})
        
        return user
    }
}