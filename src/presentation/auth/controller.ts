import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError } from '../../domain/errors/custom.error';
import { UserModel } from '../../data/mongodb';
import { RegisterUser } from '../../domain/use-cases/auth/register-user.use-case';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';

export class AuthController {
  constructor(
    private readonly authRepository:AuthRepository,
  ) {}

  private handleError = (error:unknown, res:Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ error:error.message });
    }
    console.log(error); // Use Winston or other logger
    return res.status(500).json({ error:'Internal server Error' });
  }

  loginUser = (req:Request, res:Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    new LoginUser(this.authRepository)
    .execute(loginUserDto!)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  registerUser = (req:Request, res:Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    new RegisterUser(this.authRepository)
    .execute(registerUserDto!)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }

  getUsers = (req:Request, res:Response) => {
    const payload = req.body.payload;
    UserModel.find()
    .then((users) => res.json({
      // users,
      user:req.body.user
    }))
    .catch(() => {
      res.status(500).json({ error:'Internal server Error' });
    });
  }
}