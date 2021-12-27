import { UserRepository} from '../Repositories/IUserRepositoryImplementations';
import { IUser } from '../Models/IUserModel';
import { PostgrestResponse } from '@supabase/supabase-js';


export class ListAllUsersUseCase{


    constructor(private UserRepository:UserRepository){

    }

    async execute():Promise<PostgrestResponse<IUser[] | null>> {

        const users = await this.UserRepository.listAll()

         
        return users
    }

}