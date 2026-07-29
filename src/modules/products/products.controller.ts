import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';
import { ResourceName, PositiveIntPipe } from '../../common';

@ResourceName('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAllWithFilters(query);
  }

  @Get(':id')
  findById(@Param('id', PositiveIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id', PositiveIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
