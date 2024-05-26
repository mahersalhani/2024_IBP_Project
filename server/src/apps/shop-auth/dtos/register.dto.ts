import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsDefined, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of a user',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Surname of a user',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'Email of a user',
  })
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Password of a user',
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;
}
