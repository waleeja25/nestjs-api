import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<T>);

    if (!entity) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);

    this.repository.merge(entity, data);

    return this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);

    await this.repository.remove(entity);
  }
}
