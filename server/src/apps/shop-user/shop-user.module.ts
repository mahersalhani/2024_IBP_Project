import { Module } from '@nestjs/common';

import { ShopUserService } from './shop-user.service';
import { ShopUserController } from './shop-user.controller';

@Module({
  controllers: [ShopUserController],
  providers: [ShopUserService],
  exports: [ShopUserService],
})
export class ShopUserModule {}
