import jwt from 'jsonwebtoken';
import { envs } from './envs';

const jwtSecret = envs.JWT_SECRET;

export class JwTAdapter {
  static async generateToken(payload: Object, duration:string = '2h'):Promise<string|null> {
    return new Promise((resolve, reject) => {
      // todo: generate of secret
      jwt.sign(payload, jwtSecret, {expiresIn: duration}, (err, token) => {
        if(err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<T>(token:string):Promise<T|null>{
    return new Promise((resolve) => {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}