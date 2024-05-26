import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ShopUserService } from '@/apps';

@Injectable()
export class ShopJwtStrategy extends PassportStrategy(Strategy, 'shop-jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: ShopUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.signedCookies?._access_token]),
      secretOrKey: configService.get('ACCESS_SECRET'),
    });
  }

  async validate({ sub }: { sub: string }) {
    try {
      return await this.userService.getUser({ sub });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
