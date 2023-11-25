import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwTAdapter } from '../../../config/jwt';
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token:string;
  user:{
    id:string;
    name:string;
    email:string;
  }
}

type SignToken = (payload:object, duration:string) => Promise<string|null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase{
  constructor(
    private readonly authRepository:AuthRepository,
    private readonly signToken:SignToken = JwTAdapter.generateToken,
  ) {}
  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // create user
    const user = await this.authRepository.register(registerUserDto);

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