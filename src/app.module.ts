import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  appConfig,
  databaseConfig,
  validationSchema,
  getTypeOrmConfig,
} from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users';
import { ProductsModule } from './modules/products';
import { CategoriesModule } from './modules/categories';

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
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
