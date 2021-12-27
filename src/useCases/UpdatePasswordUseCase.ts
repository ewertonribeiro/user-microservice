
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from '../Models/IUserModel';
import { Password } from '../Functions/Password';

interface IUpdatePassword{
    email:string,
    password:number,
    newpassword:number
}

export class UpdatePasswordUseCase{


    constructor(private UserRepository:UserRepository){}


    async execute({email ,newpassword , password}:IUpdatePassword):Promise<PostgrestResponse<IUser>>{

        const oldPass = password.toString()
        const newPass = newpassword.toString()
    
       const {data} = await this.UserRepository.findUserByEmail(email)
    
     const passHash =  data?.find(user=>user.password)
    
    
    const comparePass = await Password.Compare(oldPass , passHash?.password)
    
    if(!comparePass){
       throw new Error("Password invalid")
    }
    
    const newHash = await Password.encrypt(newPass)
    

   const newPassword = await this.UserRepository.updatePassword({email , oldPass:passHash?.password, newHash})

        return newPassword

    }
     
    

}