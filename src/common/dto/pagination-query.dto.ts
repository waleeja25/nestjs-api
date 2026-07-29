import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'Page must be an integer',
  })
  @IsPositive({
    message: 'Page must be a positive number',
  })
  @IsNumber(
    {},
    {
      message: 'Page must be a number',
    },
  )
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'Limit must be an integer',
  })
  @IsPositive({
    message: 'Limit must be a positive number',
  })
  @Max(100, {
    message: 'Limit cannot exceed 100',
  })
  @IsNumber(
    {},
    {
      message: 'Limit must be a number',
    },
  )
  limit = 10;

  @IsOptional()
  @IsString({
    message: 'Search must be a string',
  })
  @IsNotEmpty({
    message: 'Search cannot be empty',
  })
  search?: string;
}
