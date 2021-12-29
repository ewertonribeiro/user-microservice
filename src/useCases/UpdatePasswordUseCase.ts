
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from '../Models/IUserModel';
import { Password } from '../Functions/Password';

interface IUpdatePassword{
    id:string,
    password:number,
    newpassword:number
}

export class UpdatePasswordUseCase{


    constructor(private UserRepository:UserRepository){}


    async execute({id ,newpassword , password}:IUpdatePassword):Promise<PostgrestResponse<IUser>>{

        const oldPass = password.toString()
        const newPass = newpassword.toString()
    
       const user = await this.UserRepository.findUserById(id)
    
     const passHash =  user?.password
    
    
    const comparePass = await Password.Compare(oldPass , passHash)
    
    if(!comparePass){
       throw new Error("Password invalid")
    }
    
    const newHash = await Password.encrypt(newPass)
    

   const newPassword = await this.UserRepository.updatePassword({id , oldPass:passHash, newHash})

        return newPassword

    }
     
    

}