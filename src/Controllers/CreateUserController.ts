import { CreateUserUseCase } from './../useCases/CreateUserUseCase';
import { Request, Response } from 'express';
import { IUser } from '../Models/IUserModel';


interface IResponse {
  name?: string,
  email?: string,
  avatar?: string,
  id?: string,
  token: string
}
export class CreateUserController {

  constructor(private CreateUserUseCase: CreateUserUseCase) {

  }

  async handle(req: Request, res: Response): Promise<Response> {

    const { email, name, password, lastname } = req.body as IUser

    try {

      const user = await this.CreateUserUseCase.execute({ email, name, password, lastname })
      return res.status(201).json(user)

    } catch (err: any) {
      return res.status(500).json({ erro: err.message })
    }

  }
}
