import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  appConfig,
  databaseConfig,
  validationSchema,
  getTypeOrmConfig,
} from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule, CategoriesModule, ProductsModule } from './modules';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  HttpExceptionFilter,
  ResponseInterceptor,
  LoggingMiddleware,
} from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    UsersModule,
    CategoriesModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
