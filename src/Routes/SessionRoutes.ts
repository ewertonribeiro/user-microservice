import { Router } from 'express';
import { AuthMiddleware, UserMiddleware } from '../MIddlewares';
import { CreateSessionController, EndSessionController } from '../Controllers';

export const SessionRoutes = Router();

SessionRoutes.post(
  '/create/:id',
  UserMiddleware.userDoesNotExists,
  (req, res) => {
    CreateSessionController.handle(req, res);
  }
);

SessionRoutes.put(
  '/endsession/:id',
  UserMiddleware.userDoesNotExists,
  AuthMiddleware.token,
  (req, res) => {
    EndSessionController.handle(req, res);
  }
);

SessionRoutes.get('/check', AuthMiddleware.token, (_, res) => {
  res.status(200).json({ token: 'ok', valido: true });
});
