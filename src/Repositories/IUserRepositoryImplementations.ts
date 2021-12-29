import { IUser } from './../Models/IUserModel';
import { IUserRepositoryInterface } from './Interface/IUserRespository';
import { supabase } from '../DB/InitDB';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUpdatePassword  , } from './Interface/IUserRespository';
import { JWT } from '../Functions/JWT';
import { IUserToDelete} from '../Interfaces/GlobalInterfaces'



export class UserRepository implements IUserRepositoryInterface{
  
    private static INSTANCE: UserRepository;

    public static getInstance(): UserRepository{

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository();

    }

    return UserRepository.INSTANCE;
}


    async listAll(): Promise<PostgrestResponse<IUser>> {
        
        const users = await supabase.from<IUser>('Users')
        .select("*")

        return users
    }

    async createUser({ email, name, avatar, password , lastname }:IUser): Promise<PostgrestResponse<IUser>> {
        
        const newUser = {} as IUser

        const {userId , token} = JWT.SIGN()
        
        Object.assign(newUser , {
            id:userId,
            email:email,
            avatar,
            name:name,
            lastname:lastname,
            password:password,
            token:token
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

    async updatePassword({ id,newHash , oldPass}:IUpdatePassword ): Promise<PostgrestResponse<IUser>> {

        const pass = oldPass as string
        const newPassword = await supabase.from<IUser>('Users')
        .update({password:newHash})
        .match({password:pass})
        .eq("id" , id)

        return newPassword

    }
    async deleteUser({ id }: IUserToDelete): Promise<PostgrestResponse<IUser>> {
    
        try{

            const user = await supabase.from<IUser>('Users')
                .delete()
                .match({id:id})
    
            return user
        }
        catch{
            throw new Error(`Erro no repositorio`)
        }

    }

    async findUserById(id:string): Promise<IUser | undefined> {
        
        const {data} = await supabase.from<IUser>('Users')
        .select("*")
        .match({id:id})

        const user = data?.find(user=>user);

        // const Response = {
        //     name:user?.name,
        //     lastname:user?.lastname,
        //     email:user?.email,
        //     token:user?.token,
        //     id:user?.id
        // } as IResponseUser;
        
        return user
    }

    async createSession(id: string): Promise<PostgrestResponse<IUser>> {

        const newToken = JWT.SIGN(id)

        const updated= await supabase.from<IUser>('Users')
        .update({token:newToken.token})
        .match({id:id})



        return updated
    }
}