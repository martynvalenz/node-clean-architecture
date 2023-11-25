import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password:string) => Promise<string>;
type CompareFunction = (password:string, hashed:string) => Promise<boolean>;

export class AuthDataSourceImpl implements AuthDatasource{
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare
  ){}
  async login(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, name } = registerUserDto;

    try {
      // VERIFY THAT USER EXISTS
      const exists = await UserModel.findOne({email});
      if(exists) throw CustomError.badRequest('No se pudo registrar el usuario');
      const hashedPassword = await this.hashPassword(password);
      const user = await UserModel.create({
        email,
        password:hashedPassword, 
        name
      });
      // HASH PASSWORD
      await user.save();
      // CREATE USER IN DB
      return UserMapper.userEntityFromObject(user);
    } 
    catch (error) {
      if(error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
  
}