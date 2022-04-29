import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import { Request, Response, NextFunction } from "express"
import { verify } from 'jsonwebtoken'

interface IResponse {
  sub: string
}

const Repository = UserRepository.getInstance()

export const AuthMiddleware = {

  async token(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization

    if (!bearer) {
      return res.status(400).json({ error: "This route is authenticated and you need to Provide a Token!" })
    }
    const token = bearer.split(" ")

    if (token.length === 1) {
      return res.status(400).json({ error: "Token Missing!" })
    }

    try {

      const tokenValid = verify(token[1], 'ghghhdyryhfgwsyjtyweath')
      const { sub } = tokenValid as IResponse

      const user = await Repository.findUserById(sub)


      if (!user) return res.status(400).json({ error: "User Invalid" })

      if (user.id !== sub) return res.status(400).json({ error: "Token invalid" })

      if (!user.token) return res.status(400).json({ error: "This User does not have a token,you need to sign again!!!" })

      if (user.token != token[1]) return res.status(400).json({ error: "The provided token is not valid anymore!" })

      next()
    }
    catch (err: any) {
      return res.status(400).json({ error: err.message })
    }

  },

}
