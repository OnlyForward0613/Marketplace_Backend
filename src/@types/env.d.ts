declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PORT: string;
    readonly HOST: string;
    readonly SERVER_URL: string;
    readonly CLIENT_URL: string;
    readonly DB_CONNECTOR: string;
    readonly DB_HOST: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly DB_PORT: string;
    readonly DATABASE_URL: string;
    // redis
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_USERNAME: string;
    readonly REDIS_PASSWORD: string;
    readonly REDIS_URL: string;
    // secrets
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_REFRESH_PRIVATE_KEY: string;
    readonly JWT_CLIENT_PRIVATE_KEY: string;
    readonly JWT_PUBLIC_KEY: string;
    readonly JWT_ALGORITHM: string;
    readonly JWT_EXPIRE_TIME: string;
    readonly JWT_EXPIRE_REFRESH_TIME: string;
    readonly SESSION_SECRET: string;

    readonly AWS_S3_BUCKET_REGION: string;
    readonly AWS_S3_ACCESS_KEY_ID: string;
    readonly AWS_S3_SECRET_ACCESS_KEY: string;
    readonly AWS_S3_BUCKET_NAME: string;
    readonly AWS_S3_API_VERSION: string;
    readonly INFURA_URL: string;
    readonly INFURA_API_KEY: string;
    readonly INFURA_SECRET: string;
  }
}
