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
  public generateRandomString(length = 6): string {
    return Math.random()
      .toString(36)
      .replace(/[^\dA-Za-z]+/g, '')
      .slice(0, Math.max(0, length));
  }
    /**
   * generate random nonce
   * "We use a nonce to make sure your interactions are secure, and it won't cost you anything. It's like an extra lock to keep your online activities safe."
   * @param length
   */
    public generateRandomNonce(length = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    
    for (let i = nonce.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      nonce += characters.charAt(randomIndex);
    }

    return nonce.toUpperCase();
    }
}
