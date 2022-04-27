import { IUser } from './../Models/IUserModel';
import { IUpdatePassword, } from './Interface/IUserRespository';
import { JWT } from '../Functions/JWT';
import { IUserToDelete } from '../Interfaces/GlobalInterfaces'
import { IUserRepositoryInterface } from "./Interface/IUserRespository"

import { db } from '../DB/InitDB';

export class UserRepository implements IUserRepositoryInterface {

  private static INSTANCE: UserRepository;

  public static getInstance(): UserRepository {

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository();

    }

    return UserRepository.INSTANCE;
  }


  async listAll(): Promise<IUser[]> {

    const users = await db.query<IUser>(`SELECT * FROM users;`)

    return users.rows;
  }

  async createUser({ email, name, password, lastname }: IUser): Promise<IUser> {

    const newUser = {} as IUser

    const { userId, token } = JWT.SIGN()

    Object.assign(newUser, {
      id: userId,
      email: email,
      name: name,
      lastname: lastname,
      password: password,
      token: token
    })

    await db.query<IUser>(`INSERT INTO users (name,lastname,email,password,token,id) VALUES('${newUser.name}','${newUser.lastname}','${newUser.email}','${newUser.password}','${newUser.token}','${newUser.id}');`);

    const user = await db.query<IUser>(`SELECT * FROM users WHERE id='${userId}';`)

    return user.rows[0]
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {

    const query = await db.query<IUser>(`SELECT * FROM users WHERE email='${email}';`)

    if (query.rowCount === 0) return undefined;

    const user = query.rows[0]

    return user;
  }

  async updatePassword(id: string, newHash: string, oldPass: string): Promise<boolean | undefined> {

    const pass = oldPass as string

    const query = await db.query<IUser>(`UPDATE users SET password = '${newHash}' WHERE id = '${id}';`)

    if (query.rowCount === 0) return undefined;

    return true;

  }
  // async deleteUser({ id }: IUserToDelete): Promise<PostgrestResponse<IUser>> {

  //   try {

  //     const user = await supabase.from<IUser>('Users')
  //       .delete()
  //       .match({ id: id })

  //     return user
  //   }
  //   catch {
  //     throw new Error(`Erro no repositorio`)
  //   }

  // }

  async findUserById(id: string): Promise<IUser | undefined> {

    const query = await db.query<IUser>(`SELECT * FROM users WHERE id='${id}';`);

    const user = query.rows[0]

    if (query.rowCount === 0) {
      return undefined;
    }

    return user
  }

  async createSession(id: string): Promise<IUser> {

    const newToken = JWT.newToken(id)


    await db.query<IUser>(`UPDATE users SET token='${newToken}' WHERE id='${id}';`);

    const updated = await db.query<IUser>(`SELECT * FROM users WHERE id = '${id}';`);
  
    return updated.rows[0]
  }
  // async endSession(id: string): Promise<PostgrestResponse<IUser>> {

  //   const data = await supabase.from<IUser>("Users")
  //     .update({ token: null })
  //     .match({ id: id })

  //   return data

  // }
}
