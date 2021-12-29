import { IUser } from './../../Models/IUserModel';
import { PostgrestResponse } from "@supabase/supabase-js";
import { IResponseUser } from '../../Interfaces/GlobalInterfaces';

export interface IUpdatePassword{
    oldPass:any,
    id:string,
    newHash:string
}

interface IUserToDelete {
    id:string,
    password:number
}



export interface IUserRepositoryInterface{
    listAll(): Promise<PostgrestResponse<IUser>> ;

    createUser({email , id , name , avatar , password , lastname}:IUser): Promise<PostgrestResponse<IUser>>;

    findUserByEmail(email:string): Promise<PostgrestResponse<IUser>>;

    updatePassword({id , oldPass , newHash}:IUpdatePassword):Promise<PostgrestResponse<IUser>>;

    deleteUser({id , password}:IUserToDelete):Promise<PostgrestResponse<IUser>>;

    findUserById(id:string):Promise<IUser | undefined>;

    createSession(id:string):Promise<PostgrestResponse<IUser>>

    endSession(id:string):Promise<PostgrestResponse<IUser>>;
}