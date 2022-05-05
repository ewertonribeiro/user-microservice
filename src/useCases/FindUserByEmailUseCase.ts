import { UserRepository } from '../Repositories/IUserRepositoryImplementations';
import { IResponseUser } from '../Interfaces/GlobalInterfaces';

export class FindUserByEmailUseCase {
  constructor(private UserRepository: UserRepository) {}

  async execute(email: string): Promise<IResponseUser | undefined> {
    const data = await this.UserRepository.findUserByEmail(email);

    if (!data) return undefined;

    const Response = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      id: data.id,
    } as IResponseUser;

    return Response;
  }
}
