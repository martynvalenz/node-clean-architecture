import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthDataSourceImpl implements AuthDatasource{
  async login(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, name } = registerUserDto;

    try {
      // VERIFY THAT USER EXISTS

      // HASH PASSWORD

      // CREATE USER IN DB
      return new UserEntity('1',email, password, name,['ADMIN']);
    } 
    catch (error) {
      if(error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
  
}