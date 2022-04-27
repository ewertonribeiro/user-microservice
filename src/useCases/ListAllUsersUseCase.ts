import { IUser } from './../Models/IUserModel';
import { UserRepository } from '../Repositories/IUserRepositoryImplementations';
import { IResponseUser } from '../Interfaces/GlobalInterfaces';


export class ListAllUsersUseCase {


  constructor(private UserRepository: UserRepository) {

  }

  async execute(): Promise<IResponseUser[] | Error> {

    try {

      const data = await this.UserRepository.listAll()


      //Cria um novo array somente com as informacoes para exibir
      const users = data.map(item => {
        const response = {
          id: item.id,
          name: item.name,
          email: item.email,
          lastname: item.lastname
        } as IResponseUser;

        return response;
      })


      return users;
    } catch (error: any) {
      const err = new Error(error.message)
      return err;
    }

    // const user = data?.find(user=>user)

    // const Response = {
    //     email:user?.email,
    //     name:user?.name,
    //     lastname:user?.lastname,
    //     token:user?.token
    // } as IResponseUser

  }

}
