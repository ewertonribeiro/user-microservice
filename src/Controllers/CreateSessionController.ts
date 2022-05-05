import { Request, Response } from 'express';
import { CreateSessionUseCase } from '../useCases/CreateSessionUseCase';

interface IResponse {
  name?: string,
  token?: string
}
interface ICreateSession {
  id: string,
  password: number,
  email:string
}
export class CreateSessionController {
  constructor(private CreateSessionUseCase: CreateSessionUseCase) { }

  async handle(req: Request<unknown>, res: Response): Promise<Response<IResponse>> {
    const { id } = req.params as ICreateSession;
    const { password, email } = req.body as ICreateSession;

    try {
      const session = await this.CreateSessionUseCase.execute({ id, password, email });
      return res.status(201).json(session);
    } catch (err) {
      return res.status(400).json(`${err}`);
    }
  }
}
