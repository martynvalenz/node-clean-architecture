import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authDatasource: AuthDatasource,
  ) {}
  async login(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
  async register(registerUserDto:RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}