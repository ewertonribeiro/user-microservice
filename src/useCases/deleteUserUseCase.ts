import { Password } from '../Functions/Password';
import { IUser } from '../Models/IUserModel';
import { UserRepository } from '../Repositories/IUserRepositoryImplementations';

interface IUserToDelete {
  id: string;
  password: string;
  token: string | undefined;
}

export class DeleteUserUseCase {
  constructor(private UserRepository: UserRepository) {}

  async execute({ id, password, token }: IUserToDelete): Promise<boolean> {
    const pass = password.toString();

    const user = await this.UserRepository.findUserById(id);

    if (user?.token != token)
      throw new Error('You must be logged as the user you want to delete!');

    const passIsRigth = await Password.Compare(pass, user?.password);

    if (!passIsRigth) throw new Error('Passord invalid');

    const userToDelete = await this.UserRepository.deleteUser(id);

    return userToDelete;
  }
}
