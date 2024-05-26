import { ShopUserService, ShopAuthService } from '@/apps';
import { Injectable, NestMiddleware } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '@/common';

@Injectable()
export class ShopJwtMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: ShopUserService,
    private readonly authService: ShopAuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // check how much time is left until the token expires
      // if still have 5 minutes or more, just call next()
      // if less than 5 minutes, call refreshToken() and then call next()
      const token = req?.signedCookies?._access_token;
      const refreshToken = req?.signedCookies?._refresh_token;

      if (!refreshToken) return next();

      if (!token) {
        const { sub, salt } = jwt.decode(refreshToken) as JwtPayload;

        const user = await this.userService.validateRefreshToken(sub, refreshToken, salt);

        if (!user) return next();

        const tokens = (await this.authService.refreshToken(user, res, true)) as {
          accessToken: string;
          refreshToken: string;
        };

        req.signedCookies._access_token = tokens.accessToken;

        return next();
      }

      const { exp, sub, salt } = jwt.decode(token) as JwtPayload;
      if (!exp || !sub) return next();

      const now = Date.now().valueOf() / 1000;
      if (exp - now > 5 * 60) return next(); // will refresh token when it's less than 5 minutes, even if it's expired

      const user = await this.userService.validateRefreshToken(sub, refreshToken, salt);

      if (!user) return next();

      const tokens = (await this.authService.refreshToken(user, res, true)) as {
        accessToken: string;
        refreshToken: string;
      };

      req.signedCookies._access_token = tokens.accessToken;

      next();
    } catch (error) {
      next();
    }
  }
}
