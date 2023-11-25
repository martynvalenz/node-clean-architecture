import { Request, Response } from 'express';

export class AuthController {
  constructor() {
    console.log('AuthController initialized');
  }

  loginUser = (req:Request, res:Response) => {
    res.json({ message: 'loginUser' });
  }

  registerUser = (req:Request, res:Response) => {
    res.json({ message: 'registerUser' });
  }
}