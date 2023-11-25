import { Router } from 'express';
import { AuthController } from './controller';
import { AuthRepositoryImpl } from '../../infasctructure/repositories/auth.repository.impl';
import { AuthDataSourceImpl } from '../../infasctructure/datasources/auth.datasource.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
  static get routes():Router {
    const router = Router();
    const authDatasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);
    const controller = new AuthController(authRepository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/', [AuthMiddleware.validateToken], controller.getUsers);
    return router;
  }
}