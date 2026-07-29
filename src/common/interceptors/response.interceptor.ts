import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { DEFAULT_MESSAGES } from '../constants';
import { RESOURCE_NAME } from '../decorators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const resourceName = this.reflector.get<string>(
      RESOURCE_NAME,
      context.getClass(),
    );

    const action = DEFAULT_MESSAGES[request.method] ?? 'processed successfully';

    const message = resourceName
      ? `${resourceName} ${action}`
      : 'Request successful';

    return next.handle().pipe(
      map((data: T) => {
        return {
          success: true,
          message,
          data,
        };
      }),
    );
  }
}
