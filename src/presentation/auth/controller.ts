import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError } from '../../domain/errors/custom.error';
import { JwTAdapter } from '../../config/jwt';
import { UserModel } from '../../data/mongodb';

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
    res.json({ message: 'loginUser' });
  }

  registerUser = (req:Request, res:Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    this.authRepository.register(registerUserDto!)
    .then(async(user) => {
      res.json({
        user,
        token:await JwTAdapter.generateToken({id:user.id})
      });
    })
    .catch(error => this.handleError(error, res));
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