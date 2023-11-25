import {hashSync, compareSync} from 'bcryptjs';

export class BcryptAdapter {
  static async hash(password: string): Promise<string> {
    return hashSync(password);
  }

  static async compare(password: string, hashed: string): Promise<boolean> {
    return compareSync(password, hashed);
  }
}