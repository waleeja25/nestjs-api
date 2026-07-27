import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  appConfig,
  databaseConfig,
  validationSchema,
  getTypeOrmConfig,
} from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule, CategoriesModule, ProductsModule } from './modules';

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
})
export class AppModule {}
