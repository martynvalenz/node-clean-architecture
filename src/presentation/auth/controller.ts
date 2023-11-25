import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';

export class AuthController {
  constructor(
    private readonly authRepository:AuthRepository,
  ) {}

  loginUser = (req:Request, res:Response) => {
    res.json({ message: 'loginUser' });
  }

  registerUser = (req:Request, res:Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    this.authRepository.register(registerUserDto!)
    .then(user => res.json(user))
    .catch(error => res.status(500).json({ error }));
  }
}