import { IUser } from './../Models/IUserModel';
import { UserRepository} from '../Repositories/IUserRepositoryImplementations';
import { PostgrestResponse } from '@supabase/supabase-js';


export class FindUserByEmailUseCase{


    constructor(private UserRepository:UserRepository){

    }

    async execute(email:string):Promise<PostgrestResponse<IUser>> {

        const user = await this.UserRepository.findUserByEmail(email)

        return user
    }

}

         