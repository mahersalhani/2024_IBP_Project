import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

export const getLocaleByContext = (context: ExecutionContext): string => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest<Request>().headers['x-locale'] as string;
  }

  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().local;
  }
};

export const Locale = createParamDecorator((_data: unknown, context: ExecutionContext) => getLocaleByContext(context));
