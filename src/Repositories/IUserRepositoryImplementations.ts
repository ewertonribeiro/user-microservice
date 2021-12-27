import { IUser } from './../Models/IUserModel';
import { IUserRepositoryInterface } from './Interface/IUserRespository';
import { supabase } from '../DB/InitDB';
import { PostgrestResponse } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
import { IUpdatePassword } from './Interface/IUserRespository';

interface IUserToDelete{
    id:string,
    password:number | string
}


export class UserRepository implements IUserRepositoryInterface{
  
    private static INSTANCE: UserRepository;

    public static getInstance(): UserRepository{

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository();

    }

    return UserRepository.INSTANCE;
}


    async listAll(): Promise<PostgrestResponse<IUser[]  | null >> {
        
        const users = await supabase.from<IUser[]  | null>('Users')
        .select("*")

        return users
    }

    async createUser({ email, name, avatar, password }:IUser): Promise<PostgrestResponse<IUser>> {
        
        const newUser = {} as IUser

        Object.assign(newUser , {
            id:uuid(),
            email:email,
            avatar,
            name:name.firstname,
            lastname:name.lastname,
            password:password
        })

        const user = await supabase.from<IUser>('Users')
        .insert([newUser])
     

        return user
    }

    async findUserByEmail( email : string): Promise<PostgrestResponse<IUser>> {
        
        
        
        const user = await supabase.from<IUser>('Users')
        .select("*")
        .match({email:email})


        return user
    }

    async updatePassword({ email,newHash , oldPass}:IUpdatePassword ): Promise<PostgrestResponse<IUser>> {

        const pass = oldPass as string
        const newPassword = await supabase.from<IUser>('Users')
        .update({password:newHash})
        .match({password:pass})
        .eq("email" , email)

        return newPassword

    }
    async deleteUser({ id }: IUserToDelete): Promise<PostgrestResponse<IUser>> {
    
        const user = await supabase.from<IUser>('Users')
            .delete()
            .match({id:id})

        return user

    }

    async findUserById(id:string): Promise<PostgrestResponse<IUser>> {
        
        const user = await supabase.from<IUser>('Users')
        .select("*")
        .match({id:id})

        

        return user
    }


}