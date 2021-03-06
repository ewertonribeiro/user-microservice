import { ListAllUsersUseCase } from './../useCases/ListAllUsersUseCase';
import { Request, Response } from "express";




export class ListAllUserController {

  constructor(private ListAllUsersUseCase: ListAllUsersUseCase) {

  }

  async handle(req: Request, res: Response): Promise<Response> {

    const users = await this.ListAllUsersUseCase.execute();


    return res.status(200).json(users)
  }
}
