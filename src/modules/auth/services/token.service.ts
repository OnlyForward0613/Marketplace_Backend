// token.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { recoverMessageAddress, isHex } from 'viem';

/** Salt or number of rounds to generate a salt */
export type Salt = string | number;

const BCRYPT_SALT_VAR = 'application.BCRYPT_SALT';
const UNDEFINED_SALT_OR_ROUNDS_ERROR = `${BCRYPT_SALT_VAR} is not defined`;
const SALT_OR_ROUNDS_TYPE_ERROR = `${BCRYPT_SALT_VAR} must be a positive integer or text`;
const VerifyMsg = 'Connected with Inkubate';

@Injectable()
export class TokenService {
  /**
   * the salt to be used to hash the token. if specified as a number then a
   * salt will be generated with the specified number of rounds and used
   */
  salt: Salt;
  private logger = new Logger(TokenService.name);
  constructor(private configService: ConfigService) {
    const saltOrRounds = this.configService.get(BCRYPT_SALT_VAR);
    this.salt = parseSalt(saltOrRounds);
  }

  /**
   *
   * @param token the token to be encrypted.
   * @param encrypted the encrypted token to be compared against.
   * @returns whether the token match the encrypted token
   */
  async compare(token: string, encrypted: string): Promise<boolean> {
    return await argon2.verify(encrypted, token);
  }

  /**
   * @param token the token to be encrypted
   * @return encrypted token
   */
  async hash(token: string): Promise<string> {
    return await argon2.hash(token);
  }

  async verifySignature(
    walletAddress: string,
    nonce: string,
    signature: string,
  ): Promise<[boolean, string]> {
    try {
      const recoveredAddress = await recoverMessageAddress({
        message: `${VerifyMsg}\nnonce:${nonce}`,
        signature: Buffer.from(signature.slice(2), 'hex'),
      });
      this.logger.log(`RecoveredAddress is ${recoveredAddress}`);
      return [
        walletAddress.toLowerCase() === recoveredAddress.toLowerCase(),
        '',
      ];
    } catch (err) {
      this.logger.log(`Invalid signature: ${err}`);
      return [false, err.message];
    }
  }

  verifyWallet(walletAddress: string) {
    const isValid = isHex(walletAddress) && walletAddress.length === 42;
    if (!isValid)
      throw new BadRequestException('Provided wallet address is invalid');
    else return;
  }
}

export function hexNonce(nonce: string) {
  return `0x${Buffer.from(nonce).toString('hex')}`;
}
/**
 * Parses a salt environment variable value.
 * If a number string value is given tries to parse it as a number of rounds to generate a salt
 * @param value salt environment variable value
 * @returns salt or number of rounds to generate a salt
 */
export function parseSalt(value: string | undefined): Salt {
  if (value === undefined) {
    throw new Error(UNDEFINED_SALT_OR_ROUNDS_ERROR);
  }

  const rounds = Number(value);

  if (Number.isNaN(rounds)) {
    return value;
  }
  if (!Number.isInteger(rounds) || rounds < 0) {
    throw new Error(SALT_OR_ROUNDS_TYPE_ERROR);
  }
  return rounds;
}
