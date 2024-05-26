import { ApiProperty } from '@nestjs/swagger';

export class UploadImageRes {
  @ApiProperty({ example: 1, description: 'id of image' })
  id: number;

  @ApiProperty({ example: 'product/1234567890', description: 'key of image' })
  key: string;

  @ApiProperty({ example: 'https://d1j3t8y7f7vzr.cloudfront.net/product/1234567890', description: 'url of image' })
  url: string;
}
