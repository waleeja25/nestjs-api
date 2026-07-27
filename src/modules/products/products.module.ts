import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities';

import { UsersModule } from '../users';
import { CategoriesModule } from '../categories';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UsersModule, CategoriesModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
