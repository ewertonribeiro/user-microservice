import { Request, Response } from 'express';
import { UpdatePasswordUseCase } from '../useCases/UpdatePasswordUseCase';

interface IUpdatePassword{
    id:string,
    password:string,
    newpassword:string
}

export class UpdatePasswordController {
  constructor(private UpdatePasswordUseCase:UpdatePasswordUseCase) {}

  async handle(req:Request<unknown>, res:Response):Promise<Response> {
    const { id } = req.params as IUpdatePassword;
    const { password, newpassword } = req.body as IUpdatePassword;

    try {
      const response = await this.UpdatePasswordUseCase.execute({ id, password, newpassword });

      if (!response.ok) return res.status(500).json(response);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `${err}`,
      });
    }
  }
}
