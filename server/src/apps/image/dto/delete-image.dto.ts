import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteImageDto {
  @ApiProperty({ example: 'product/1234567890', description: 'key of image' })
  @IsString()
  @IsNotEmpty()
  key: string;
}
