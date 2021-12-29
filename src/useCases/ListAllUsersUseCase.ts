import { IUser } from './../Models/IUserModel';
import { UserRepository} from '../Repositories/IUserRepositoryImplementations';
import { IResponseUser } from '../Interfaces/GlobalInterfaces';

export class ListAllUsersUseCase{


    constructor(private UserRepository:UserRepository){

    }

    async execute():Promise<IUser[] | null>{

        const {data}= await this.UserRepository.listAll()

        const user = data?.find(user=>user)
        
        // const Response = {
        //     email:user?.email,
        //     name:user?.name,
        //     lastname:user?.lastname,
        //     token:user?.token
        // } as IResponseUser
         
        return data
    }

}