/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../Repositories/IUserRepositoryImplementations';

interface IResponse {
  sub: string;
}

const Repository = UserRepository.getInstance();

export const AuthMiddleware = {
  async token(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;
    console.log(req.headers);

    if (!bearer) {
      return res.status(400).json({ error: 'Credenciais Invalidas!' });
    }
    const token = bearer.split(' ');

    if (token.length === 1) {
      return res.status(400).json({ error: 'Credenciais Invalidas!' });
    }

    try {
      const tokenValid = verify(token[1], 'ghghhdyryhfgwsyjtyweath');
      const { sub } = tokenValid as IResponse;

      const user = await Repository.findUserById(sub);

      if (!user) return res.status(400).json({ error: 'Acesso negado' });

      if (user.id !== sub) {
        return res.status(400).json({ error: 'Token invalido' });
      }

      if (!user.token) {
        return res.status(400).json({ error: 'Token invalido!!!' });
      }

      if (user.token != token[1]) {
        return res.status(400).json({ error: 'Token invalido' });
      }

      next();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
