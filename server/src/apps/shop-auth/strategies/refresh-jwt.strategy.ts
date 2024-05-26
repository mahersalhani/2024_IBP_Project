import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';

import { JwtPayload } from '@/common';
import { ShopUserService } from '@/apps/shop-user';

@Injectable()
export class ShopRefreshJwtStrategy extends PassportStrategy(Strategy, 'shop-refresh-jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: ShopUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.signedCookies?.refresh]),
      secretOrKey: configService.get('REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: JwtPayload) {
    const { sub } = payload;
    const token = request?.signedCookies?.refresh;
    console.log('sub', sub);
    console.log('token', token);

    // TODO if used shop-refresh-jwt guard, uncomment this
    try {
      // return await this.userService.validateRefreshToken(sub, token);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
