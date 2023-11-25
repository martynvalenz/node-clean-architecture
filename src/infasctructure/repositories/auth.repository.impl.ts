import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authDatasource: AuthDatasource,
  ) {}
  async login(loginUserDto:LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
  
  async register(registerUserDto:RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}