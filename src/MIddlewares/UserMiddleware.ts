
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { IUser } from './../Models/IUserModel';
import { Request , Response , NextFunction } from 'express';


const Repository = UserRepository.getInstance();



class UserMidleware{
    async userAlredyExists(req:Request , res:Response , next:NextFunction){
        const {email} = req.body as IUser


        const {data}= await Repository.findUserByEmail(email)

       const userExists =  data?.some(user=>user.email ===email)

        if(userExists){

            return res.status(400).json({error:"User Alredy exists"})
        }


        return next()
}
async userDoesNotExists(req:Request , res:Response , next:NextFunction){
    const id = req.params.id


    const user = await Repository.findUserById(id)
 
    if(!user){
        return res.status(400).json({Error:"User does not exists at UserMiddleware"})
    }

    if(user.id !== id){

        return res.status(400).json({error:"User Invalid at UserMiddleware"})
    }


    return next()

}

}

const UserMiddleware = new UserMidleware()



export {UserMiddleware}

            

