import { AuthRepository } from "../../repositories/auth.repository";
import { JwTAdapter } from '../../../config/jwt';
import { CustomError } from "../../errors/custom.error";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";

interface UserToken {
  token:string;
  user:{
    id:string;
    name:string;
    email:string;
  }
}

type SignToken = (payload:object, duration:string) => Promise<string|null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase{
  constructor(
    private readonly authRepository:AuthRepository,
    private readonly signToken:SignToken = JwTAdapter.generateToken,
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // create user
    const user = await this.authRepository.login(loginUserDto);

    // return token
    const token = await this.signToken({ id:user.id }, '2h');
    if(!token) throw CustomError.internalServer('Error generating token');

    return {
      token,
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }
  }

}