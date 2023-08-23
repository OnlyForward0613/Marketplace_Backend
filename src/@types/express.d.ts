declare namespace Express {
    interface Request {
      id: string;
      session?: {
        authToken?: {
          accessToken: string;
          refreshToken: string;
        };
        res: Response;
      };
    }
  }
  