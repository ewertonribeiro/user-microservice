import { Password } from '../Functions/Password';
import { UserRepository } from '../Repositories/IUserRepositoryImplementations';

interface IResponse {
  name: string;
  token: string | null | undefined;
}
interface IRequest {
  id: string;
  password: number;
  email: string;
}
export class CreateSessionUseCase {
  constructor(private UserRepository: UserRepository) {}

  async execute({ password, id, email }: IRequest): Promise<IResponse> {
    const pass = password.toString();

    try {
      /// /////////   Valida os dados   /////////////////////
      const user = await this.UserRepository.findUserById(id);

      if (!user) throw new Error('User does not exists!');

      if (user.email != email) throw new Error('Password/Email invalid');

      const passIsRigth = await Password.Compare(pass, user.password);

      if (!passIsRigth) throw new Error('Password/Email invalid');
      /// //////////////////////////////////////////////////////////
      const Response = await this.UserRepository.createSession(id);

      const newtoken = {
        name: Response.name,
        token: Response.token,
      };

      return newtoken;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
