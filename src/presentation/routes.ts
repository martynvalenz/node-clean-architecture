import { Router } from 'express';
import { AuthRoutes } from './auth/routes';

const apiVersion = 'v1';
export class AppRoutes {
  static get routes():Router {
    const router = Router();
    router.get('/', (req, res) => {
      res.send('Hello World!');
    });

    router.use(`/api/${apiVersion}/auth`, AuthRoutes.routes);
    return router;
  }
}