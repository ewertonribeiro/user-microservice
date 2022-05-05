import { Router } from 'express';
import { Password } from '../Functions/Password';
import {
  ListAllUsercontroller,
  CreateuserController,
  FindUserByEmailController,
  UpdatePasswordController,
  DeleteUserController,
} from '../Controllers';
import { UserMiddleware, AuthMiddleware } from '../MIddlewares';

export const userRoutes = Router();

userRoutes.get('/listall', AuthMiddleware.token, (req, res) => {
  ListAllUsercontroller.handle(req, res);
});

userRoutes.get('/:email', AuthMiddleware.token, (req, res) => {
  FindUserByEmailController.handle(req, res);
});

userRoutes.post('/create', (req, res) => {
  CreateuserController.handle(req, res);
});

userRoutes.put(
  '/update/:id',
  UserMiddleware.userDoesNotExists,
  AuthMiddleware.token,
  (req, res) => {
    UpdatePasswordController.handle(req, res);
  },
);

userRoutes.delete(
  '/delete/:id',
  UserMiddleware.userDoesNotExists,
  AuthMiddleware.token,
  (req, res) => {
    DeleteUserController.handle(req, res);
  },
);

// userRoutes.get("/teste", async (req, res) => {
//   const pass = 80523333
//   const password = pass.toString()
//   const user = await Password.Compare("80523333", '$2b$08$GeyW1bpis3d2okMgKp1JJuiOoeHGRMHO5EGF1yhl2vNuMwi17yqxy')

//   return res.json(user)
// })
