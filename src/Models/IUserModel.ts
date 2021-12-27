

type Name = {
    firstname:string,
    lastname:string
}


export interface IUser{
    id?:string;
    name:Name;
    email:string;
    password:number | string ;
    avatar?:string


   
}