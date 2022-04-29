import { Password } from '../Functions/Password';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';

interface IRequest {
  id: string,
  password: string,
  token: string
}

interface IResponse {
  name: string,
  status: string,
  ok: boolean
}
export class EndSessionUseCase {

  constructor(private UserRepository: UserRepository) { }

  async execute({ password, id, token }: IRequest): Promise<IResponse> {


    if (!password) throw new Error("You must Provide a Password")

    const user = await this.UserRepository.findUserById(id)

    const passCompare = await Password.Compare(password, user?.password)

    if (!passCompare) throw new Error("Password Invalid")

    if (user?.token != token) throw new Error("You must be logged as the user you want to Log out!");

    const data = await this.UserRepository.endSession(id)

    if (!data) {
      return {
        ok: false,
        name: `${user?.name}  ${user?.lastname}`,
        status: "Erro in ending session"
      } as IResponse;
    }

    const IResponse = {
      ok: true,
      name: `${user?.name} ${user?.lastname}`,
      status: "Token Deleted"
    } as IResponse

    return IResponse

  }
}
