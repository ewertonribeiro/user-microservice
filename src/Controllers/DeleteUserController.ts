import { Request, Response } from 'express';
import { DeleteUserUseCase } from './../useCases/deleteUserUseCase';

interface IUserToDelete {
  id: string,
  password: string
}

export class DeleteUserController {

  constructor(private DeleteUserUseCase: DeleteUserUseCase) { }


  async handle(req: Request<unknown>, res: Response): Promise<Response> {

    const { id } = req.params as IUserToDelete;
    const { password } = req.body as IUserToDelete

    const bearer = req.headers.authorization
    const token = bearer?.split(" ")[1];

    try {
      const deleteUser = await this.DeleteUserUseCase.execute({ id, password, token })

      if (!deleteUser) return res.status(404).json({ ok: false, message: "Problem deleting the user,try again!" })

      return res.json({ ok: true, message: "User deleted" })
    }
    catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }
}
