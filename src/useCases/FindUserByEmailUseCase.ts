import { UserRepository} from '../Repositories/IUserRepositoryImplementations';
import { IResponseUser } from '../Interfaces/GlobalInterfaces';


export class FindUserByEmailUseCase{


    constructor(private UserRepository:UserRepository){

    }

    async execute(email:string):Promise<IResponseUser | null> {

        const {data} = await this.UserRepository.findUserByEmail(email)

        const user = data?.find(user=>user)
        const Response = {
            name:user?.name,
            lastname:user?.lastname,
            email:user?.email,
            token:user?.token
        } as IResponseUser
        return Response
    }

}

         