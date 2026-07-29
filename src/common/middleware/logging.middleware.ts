import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('LoggingMiddleware');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const resource = req.originalUrl.split('/')[1];

      this.logger.log(
        `${method} request received for ${resource} status: ${res.statusCode} - ${responseTime}ms`,
      );
    });

    next();
  }
}
