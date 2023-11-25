import { UserEntity } from "../entity/user.entity";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthRepository {
  abstract login(email:string, password:string):Promise<string>;
  abstract register(registerUserDto:RegisterUserDto):Promise<UserEntity>;
}