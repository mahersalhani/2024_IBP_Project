import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ShopUserModule } from '../shop-user';
import { ShopAuthService } from './shop-auth.service';
import { ShopAuthController } from './shop-auth.controller';
import { ShopLocalStrategy, ShopRefreshJwtStrategy } from './strategies';

@Module({
  imports: [ShopUserModule, JwtModule.register({})],
  controllers: [ShopAuthController],
  providers: [ShopAuthService, ShopLocalStrategy, ShopRefreshJwtStrategy],
  exports: [ShopAuthService],
})
export class ShopAuthModule {}
