import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumberString, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Verification code',
    example: '123456',
    maxLength: 6,
    minLength: 6,
    title: 'Code',
  })
  @IsDefined()
  @IsNumberString({ no_symbols: true })
  @Length(6, 6, { message: 'Code must be 6 digits' })
  code: string;
}
