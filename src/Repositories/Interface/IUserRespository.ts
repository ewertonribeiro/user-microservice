import { IUser } from './../../Models/IUserModel';
// import { IResponseUser } from '../../Interfaces/GlobalInterfaces';

export interface IUpdatePassword {
  oldPass: any,
  id: string,
  newHash: string
}

// interface IUserToDelete {
//   id: string,
//   password: number
// }



export interface IUserRepositoryInterface {
  listAll(): Promise<IUser[]>;

  createUser({ email, id, name, password, lastname }: IUser): Promise<IUser | Error>;

  findUserByEmail(email: string): Promise<IUser | undefined>;

  updatePassword(id: string, oldPass: string, newHash: string): Promise<boolean | undefined>;

  deleteUser(id: string, password: string): Promise<boolean>;

  findUserById(id: string): Promise<IUser | undefined>;

  createSession(id: string): Promise<IUser>

  endSession(id: string): Promise<boolean>;
}
