import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ example: 'product', description: 'path to upload image' })
  @IsString()
  path: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to be uploaded',
  })
  image: Express.Multer.File;

  @ApiProperty({ required: false, example: 200, description: 'width of image' })
  @IsOptional()
  @IsNumberString()
  width?: number;

  @ApiProperty({ required: false, example: 200, description: 'height of image' })
  @IsOptional()
  @IsNumberString()
  height?: number;

  @ApiProperty({ required: false, example: 100, description: 'quality of image' })
  quality?: number;
}
