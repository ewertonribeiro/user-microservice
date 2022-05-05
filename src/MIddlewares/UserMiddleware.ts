import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../Repositories/IUserRepositoryImplementations';
import { IUser } from '../Models/IUserModel';

const Repository = UserRepository.getInstance();

class UserMidleware {
  async userAlredyExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as IUser;

    const user = await Repository.findUserByEmail(email);

    if (user) return res.status(400).json({ error: 'User Alredy exists' });

    return next();
  }

  async userDoesNotExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await Repository.findUserById(id);

    if (!user) return res.status(404).json({ Error: 'User does not exists' });

    if (user.id !== id) return res.status(400).json({ error: 'User Invalid' });

    return next();
  }
}

const UserMiddleware = new UserMidleware();

export { UserMiddleware };
