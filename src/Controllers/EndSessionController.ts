import { Request, Response } from 'express';
import { EndSessionUseCase } from '../useCases/EndSessionUseCase';

interface IRequest {
  id: string,
  token: string,
  password: string
}
interface IResponse {
  name: string,
  status: string
}
export class EndSessionController {
  constructor(private EndSessionUseCase: EndSessionUseCase) { }

  async handle(req: Request<unknown>, res: Response): Promise<Response<IResponse>> {
    const { id } = req.params as IRequest;
    const { password } = req.body as IRequest;

    const bearer = req.headers.authorization;
    const token = bearer?.split(' ')[1];

    try {
      const user = await this.EndSessionUseCase.execute({ password, id, token });

      if (user.ok) {
        return res.status(200).json(user);
      }

      return res.status(400).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
