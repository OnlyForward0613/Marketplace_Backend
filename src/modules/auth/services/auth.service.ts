import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IPayloadUserJwt, ISessionAuthToken } from '@common/interfaces';
import { excludeFieldPrisma } from '@common/prisma-utils';
import { GeneratorService } from '@common/providers';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { RedisE } from '@redis/redis.enum';
import { RedisService } from '@redis/redis.service';
import validator from 'validator';
import { ForbiddenException, NotFoundException } from '../../../errors';
import { UserSigninDto } from '../dto/signin.dto';
import { TokenService } from './token.service';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private redisService: RedisService,
    private generatorService: GeneratorService,
  ) {}

  async validateUser({ walletAddress }: UserSigninDto): Promise<boolean> {
    this.logger.log(`${'*'.repeat(20)} validateUser() ${'*'.repeat(20)}`);
    this.logger.log(walletAddress);
    const user = await this.prismaService.user.findUnique({
      where: { walletAddress },
    });
    // return this.tokenService.compare(password, user.password);
    return true;
  }

  public async signUp({ walletAddress }: SignupDto) {
    this.logger.log(
      `${'*'.repeat(20)} signUp(${walletAddress}) ${'*'.repeat(20)}`,
    );

    this.tokenService.verifyWallet(walletAddress);

    const nonce = this.generatorService.generateRandomNonce();
    let users = await this.prismaService.user.findMany({
      where: {
        walletAddress,
      },
    });
    if (users.length > 0) {
      await this.prismaService.user.update({
        where: { walletAddress },
        data: { nonce },
      });
    } else {
      await this.userService.createUser({
        nonce: nonce,
        username: walletAddress.slice(0, 5) + '...' + walletAddress.slice(-5),
        walletAddress: walletAddress,
      });
    }

    return nonce;
  }

  public async signIn({ walletAddress, signature }: UserSigninDto) {
    const user = await this.userService.getUser({
      where: { walletAddress },
    });
    if (!user)
      throw new BadRequestException('Provided walletAddress is invalid');

    const isValid = await this.tokenService.verifySignature(
      user.walletAddress,
      user.nonce,
      signature,
    );
    if (!isValid)
      throw new BadRequestException('Provided signature is invalid');

    const authTokens = await this.generateAuthToken({
      id: user.id,
      walletAddress: user.walletAddress,
    });
    return authTokens;
  }

  public async signout(userId: string): Promise<boolean> {
    await this.removeJwtRefreshToken(userId);
    return true;
  }

  public async generateAuthToken(payload: IPayloadUserJwt) {
    return {
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefreshToken(payload),
    };
  }

  public async createAccessToken(payload: IPayloadUserJwt) {
    const secrets = this.configService.get('secrets');

    return this.jwtService.signAsync(payload, {
      expiresIn: secrets.JWT_EXPIRE_TIME,
    });
  }

  public async createRefreshToken(payload: IPayloadUserJwt) {
    const secrets = this.configService.get('secrets');
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secrets.JWT_REFRESH_PRIVATE_KEY,
      expiresIn: secrets.JWT_EXPIRE_REFRESH_TIME,
    });
    const hashedRefreshToken = await this.tokenService.hash(refreshToken);
    await this.redisService.client.setex(
      `${RedisE.REDIS_REFRESH_TOKEN}:${payload.id}`,
      secrets.JWT_EXPIRE_REFRESH_TIME,
      hashedRefreshToken,
      (err, res) => {
        if (err) {
          throw new InternalServerErrorException(err);
        }
      },
    );
    return refreshToken;
  }

  public async validateAccessToken(userId: string) {
    const savedRefreshToken = await this.redisService.client.get(
      `${RedisE.REDIS_REFRESH_TOKEN}:${userId}`,
    );
    if (!savedRefreshToken) {
      throw new NotFoundException('Token is invalid');
    }
  }

  public async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getUser({
      where: { id: userId },
    });
    const savedRefreshToken = await this.redisService.client.get(
      `${RedisE.REDIS_REFRESH_TOKEN}:${userId}`,
    );
    if (!savedRefreshToken) {
      throw new NotFoundException('Token is invalid');
    }
    const isMatched = await this.tokenService.compare(
      refreshToken,
      savedRefreshToken,
    );
    if (!isMatched) {
      throw new BadRequestException('The refresh token is not valid.');
    }
    if (savedRefreshToken) {
      return user;
    }
  }

  public async refreshTokens(payload: IPayloadUserJwt, refreshToken: string) {
    if (!payload.id || !payload.walletAddress)
      throw new ForbiddenException('Access denied.');

    const user = await this.validateRefreshToken(payload.id, refreshToken);
    if (!user) throw new ForbiddenException('refresh_token_expired');

    return await this.generateAuthToken(payload);
  }

  async removeJwtRefreshToken(userId: string) {
    const user = await this.userService.getUser({
      where: { id: userId },
    });

    const deletedResult = await this.redisService.client.del(
      `${RedisE.REDIS_REFRESH_TOKEN}:${userId}`,
    );

    if (deletedResult === 1) {
      return user;
    } else {
      throw new NotFoundException('The refresh token was not found');
    }
  }
}
