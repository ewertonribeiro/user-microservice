import { Password } from './../Functions/Password';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from '../Models/IUserModel';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';


interface IUserToDelete {
    id:string,
    password:number
}

export class DeleteUserUseCase{


    constructor(private UserRepository:UserRepository){}


    async execute({id , password}:IUserToDelete):Promise<PostgrestResponse<IUser>>{
        const pass = password.toString()
        
        try{
            const user = await this.UserRepository.findUserById(id);
            
            if(!user){
                throw new Error("User does not exists!")
            }
        
            const passIsRigth = await Password.Compare(pass , user?.password)
    
            if(!passIsRigth){
                throw new Error("Passord invalid")
            }
    
            const userToDelete = await this.UserRepository.deleteUser({id , password})
            return userToDelete
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }
}