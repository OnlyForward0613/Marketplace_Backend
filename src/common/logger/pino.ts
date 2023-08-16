import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino(
  {
    ...(isProduction
      ? {}
      : {
          level: 'debug',
          transport: {
            target: 'pino-pretty',
          },
        }),
  },
  pino.multistream(
    [
      { stream: pino.destination({ dest: process.stdout.fd, sync: false }) },
      {
        stream: pino.destination({ dest: process.stderr.fd, sync: false }),
        level: 'error',
      },
    ],
    {},
  ),
);
