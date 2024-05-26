import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsDefined, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'john@gmail.com',
    format: 'email',
    title: 'Email',
  })
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '12345678',
    title: 'Password',
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;
}
