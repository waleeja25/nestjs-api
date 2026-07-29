import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

type ExceptionResponse = {
  message: string | string[];
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      const response = exceptionResponse as ExceptionResponse;

      message = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}
