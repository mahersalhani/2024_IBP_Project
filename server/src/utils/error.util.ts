import { HttpException, HttpStatus } from '@nestjs/common';

export const catchingError = (error: any) => {
  const message = error?.message || 'Internal server error';
  const statusCode =
    error?.status || error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(message, statusCode);
};
