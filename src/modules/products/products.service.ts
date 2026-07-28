import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../common';
import { UsersService } from '../users';
import { CategoriesService } from '../categories';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {
    super(repository);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const [user, category] = await Promise.all([
      this.usersService.findById(dto.userId, 'User'),
      this.categoriesService.findById(dto.categoryId, 'Category'),
    ]);
    return super.create({
      ...dto,
      user,
      category,
    });
  }
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    let category;

    if (dto.categoryId) {
      category = await this.categoriesService.findById(dto.categoryId);
    }

    return super.update(id, {
      ...dto,
      ...(category && { category }),
    });
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find({
      relations: {
        user: true,
        category: true,
      },
    });
  }
  override async findById(id: number): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: { user: true, category: true },
    });

    if (!product) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return product;
  }
}
