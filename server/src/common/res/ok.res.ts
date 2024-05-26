import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class OkRes {
  @ApiProperty({ example: HttpStatus.OK })
  statusCode: number;

  @ApiProperty({ example: 'OK' })
  message: string;

  constructor(message: string, statusCode: number = HttpStatus.OK) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
