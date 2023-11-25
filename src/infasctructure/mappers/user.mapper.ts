import { UserEntity } from "../../domain/entity/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object:{[key:string]:any}) {
    const {id, _id, name, email, img, roles} = object;
    if(!id || !_id) throw CustomError.badRequest('missing ID');
    if(!name || !email) throw CustomError.badRequest('missing name or email');
    
    return new UserEntity(
      id || _id,
      name,
      email,
      img,
      roles
    );
  }
}