// import { UserService } from '@/app/user';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { ShopUserService } from '@/apps/shop-user';

@Injectable()
export class ShopLocalStrategy extends PassportStrategy(Strategy, 'shop-local') {
  constructor(private readonly userService: ShopUserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }
}
