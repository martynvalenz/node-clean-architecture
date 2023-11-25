import { Request, Response, NextFunction } from 'express';
import { JwTAdapter } from '../../config/jwt';
import { UserModel } from '../../data/mongodb';

export class AuthMiddleware {
  static async validateToken(req:Request, res:Response, next:NextFunction) {
    const authorization = req.header('Authorization');
    if(!authorization) {
      return res.status(401).json({ error:'Missing token' });
    }
    if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error:'Invalid Bearer token' });
    const token = authorization.split(' ')[1] || '';

    try {
      // todo: get payload from jwt adapter
      const payload = await JwTAdapter.validateToken<{id:string}>(token);
      if(!payload) return res.status(401).json({ error:'Invalid token' });
      const user = await UserModel.findById(payload.id);
      if(!user) return res.status(401).json({ error:'Invalid token - user not found' });
      req.body.user = user;
      next();
    } catch (error) {
      console.log(error); //todo: save to winston or other logger
      res.status(500).json({ error:'Internal server Error' });
    }
  }
}