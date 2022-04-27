
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { IUser } from '../Models/IUserModel';
import { Password } from '../Functions/Password';

interface IUpdatePassword{
    id:string,
    password:string,
    newpassword:string
}

interface IUpdateMessage{
    ok:boolean,
    message:string
}

export class UpdatePasswordUseCase{


    constructor(private UserRepository:UserRepository){}


    async execute({id ,newpassword , password}:IUpdatePassword):Promise<IUpdateMessage>{

    const oldPass = password.toString()
    const newPass = newpassword.toString()
    
    const user = await this.UserRepository.findUserById(id)
    
    const passHash =  user?.password

    const comparePass = await Password.Compare(oldPass , passHash)
        
    if(!comparePass)throw new Error("Password invalid")
        
    const newHash = await Password.encrypt(newPass)
        

    const newPassword = await this.UserRepository.updatePassword(id,newHash,oldPass);

    const responseMessage = {
        error:"Error in the operation",
        success:"Password changed"
    }

    const response = {
        ok:!newPassword ? false : true,
        message:!newPassword ? responseMessage.error : responseMessage.success
    } as IUpdateMessage

    return response;

    }
     
    

}