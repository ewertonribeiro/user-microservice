import { IUser } from './../Models/IUserModel';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { Password } from '../Functions/Password'

interface IResponseUser {
  name: string,
  lastname: string,
  email: string,
  token: string,
  id: string,
}

export class CreateUserUseCase {

  constructor(private UserRepository: UserRepository) {

  }

  async execute({ password, email, name, lastname }: IUser): Promise<IResponseUser | any> {

    try {
      const hashPass = await Password.encrypt(password)

      const user = await this.UserRepository.createUser({ name, email, password: hashPass, lastname });

      const Response = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        token: user.token,
        id: user.id,
      } as IResponseUser

      return Response
    } catch (err: any) {
      throw new Error(err.message)
    }

  }
}
