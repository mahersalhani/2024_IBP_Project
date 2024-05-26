import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class DeleteImagesDto {
  @ApiProperty({ example: ['product/1234567890'], description: 'keys of images' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  keys: string[];
}
