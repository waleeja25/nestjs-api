import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

import { PaginationQueryDto } from '../../../common';

export class ProductQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId?: number;
}
