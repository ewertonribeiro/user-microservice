import { Password } from './../Functions/Password';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from '../Models/IUserModel';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';


interface IUserToDelete {
    id:string,
    password:number | string
}

export class DeleteUserUseCase{


    constructor(private UserRepository:UserRepository){}


    async execute({id , password}:IUserToDelete):Promise<PostgrestResponse<IUser>>{

        const {data} = await this.UserRepository.findUserById(id)
        
        const pass = data?.find(user=>user.password)

        const passIsRigth = await Password.Compare(password , pass?.password)

        if(!passIsRigth){
            throw new Error("Passord invalid")
        }

        const userToDelete = await this.UserRepository.deleteUser({id , password})



        return userToDelete

    }
}