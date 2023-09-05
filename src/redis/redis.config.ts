import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import { RedisE } from './redis.enum';

export const sessionConfig = (
  redisClient: Redis,
  sessionValue: string,
  secure: boolean,
) => {
  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 1000 * 60 * 60 * 24 * 30,
  });
  return {
    store: redisStore,
    name: RedisE.REDIS_AUTH_TOKEN_SESSION,
    secret: sessionValue,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure,
      // maxAge: 1000 * 60 * 60 * 24 * 30, // 60 days --> need >= max of alive time of refresh token
    },
  };
};
