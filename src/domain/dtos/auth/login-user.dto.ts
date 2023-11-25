import { Validators } from "../../../config/validators";

export class LoginUserDto {
  private constructor(
    public email:string,
    public password:string,
  ) {}

  static create(object:{[key:string]:any}):[string?, LoginUserDto?] {
    const {email, password} = object;
    if(!email) return ['Email is required'];
    if(!Validators.email.test(email)) return ['Email is invalid'];
    if(!password) return ['Password is required'];
    if(password.length < 6) return ['Password is too short'];

    return [
      undefined,
      new LoginUserDto(email.toLowerCase(), password)
    ]
  }
}