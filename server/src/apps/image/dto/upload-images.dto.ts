import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadImagesDto {
  @ApiProperty({ example: 'product', description: 'path to upload image' })
  @IsString()
  path: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'File to be uploaded',
  })
  images: Express.Multer.File[];

  @ApiProperty({ required: false, example: 200, description: 'width of image' })
  quality?: number;
}
