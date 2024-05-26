import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'john_doe', description: 'Username', required: false })
  username?: string;

  @ApiProperty({ example: '0987654321', description: 'Phone number', required: false })
  phone?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    format: 'binary',
    description: 'Avatar',
  })
  avatar?: Express.Multer.File;
}
