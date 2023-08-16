import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class GeneratorService {
  public uuid(len = 16): string {
    return nanoid(len);
  }
  public createRefreshTokenId(): string {
    return this.uuid();
  }
  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }

  public generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  public generatePassword(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = lowercase.toUpperCase();
    const numbers = '0123456789';

    let text = '';

    for (let i = 0; i < 4; i++) {
      text += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      text += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return text;
  }

  /**
   * generate random string
   * @param length
   */
  public generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^\dA-Za-z]+/g, '')
      .slice(0, Math.max(0, length));
  }
}
