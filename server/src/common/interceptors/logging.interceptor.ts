import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request;
    const { ip, method, path: url, ips } = request;
    const userIp = ips.length ? ips[0] : ip;
    const id = nanoid();

    this.logger.verbose(
      `ID:${id} ${method} ${url} NaN - ${userIp} ${context.getClass().name} ${context.getHandler().name}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;

        this.logger.debug(`ID:${id} ${method} ${url} ${statusCode} - ${userIp} ${Date.now() - now}ms`);
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
