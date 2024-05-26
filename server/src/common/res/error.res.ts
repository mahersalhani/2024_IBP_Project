import { ApiProperty } from '@nestjs/swagger';

export class BadRes {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  message: string;
}

export class ValidationErrorRes {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: ['page must be a number string', 'page should not be empty'],
  })
  message: string[];

  @ApiProperty({ example: 'Validation Error' })
  error: string;
}
