import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';

import { QueryFailedError } from 'typeorm';
import { MYSQL_ERRORS } from '../constants';

export abstract class BaseService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly entityName = 'Record',
  ) {}

  private async runQuery<R>(query: () => Promise<R>): Promise<R> {
    try {
      return await query();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errno = (error.driverError as { errno?: number })?.errno;

        if (errno === MYSQL_ERRORS.FOREIGN_KEY) {
          throw new ConflictException(
            `Cannot delete this ${this.entityName.toLowerCase()} because it is still referenced by other records.`,
          );
        }

        if (errno === MYSQL_ERRORS.DUPLICATE_ENTRY) {
          throw new ConflictException(`${this.entityName} already exists.`);
        }
        if (errno === MYSQL_ERRORS.REFERENCED_ROW_MISSING) {
          throw new ConflictException(
            `One of the referenced records for this ${this.entityName.toLowerCase()} no longer exists.`,
          );
        }
      }
      throw error;
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.runQuery(() => this.repository.save(entity));
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<T>);

    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);

    this.repository.merge(entity, data);

    return this.runQuery(() => this.repository.save(entity));
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);

    await this.runQuery(() => this.repository.remove(entity));
  }
}
