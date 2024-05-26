import { ShopUserRes } from '@/common';
import { ApiProperty } from '@nestjs/swagger';

export class ShopLoginRes {
  @ApiProperty({ type: ShopUserRes })
  user: ShopUserRes;

  @ApiProperty()
  status: string;
}
