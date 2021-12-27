import { IUser } from './../../Models/IUserModel';
import { PostgrestResponse } from "@supabase/supabase-js";

export interface IUpdatePassword{
    oldPass:any,
    email:string,
    newHash:string
}

interface IUserToDelete {
    id:string,
    password:number
}

type Pass = {
    password?:string
}
export interface IUserRepositoryInterface{
    listAll(): Promise<PostgrestResponse<IUser[] | null >> ;

    createUser({email , id , name , avatar , password}:IUser): Promise<PostgrestResponse<IUser>>;

    findUserByEmail(email:string): Promise<PostgrestResponse<IUser>>;

    updatePassword({email , oldPass , newHash}:IUpdatePassword):Promise<PostgrestResponse<IUser>>;

    deleteUser({id , password}:IUserToDelete):Promise<PostgrestResponse<IUser>>;

    findUserById(id:string):Promise<PostgrestResponse<IUser>>;


}