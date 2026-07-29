import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService, PaginatedResult } from '../../common';
import { UsersService } from '../users';
import { CategoriesService } from '../categories';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';

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
      this.usersService.findById(dto.userId),
      this.categoriesService.findById(dto.categoryId),
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

  async findAllWithFilters(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 10, search, userId, categoryId } = query;

    const qb = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      qb.andWhere('product.name LIKE :search', { search: `%${search}%` });
    }
    if (userId) {
      qb.andWhere('product.userId = :userId', { userId });
    }
    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    qb.orderBy('product.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [products, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    if (total === 0 && (search || userId || categoryId)) {
      throw new NotFoundException('No matching products found.');
    }

    if (page > totalPages && total > 0) {
      throw new NotFoundException(`Page ${page} does not exist`);
    }

    return {
      items: products,
      meta: { page, limit, total, totalPages },
    };
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
