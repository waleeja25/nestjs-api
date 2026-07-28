import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: 'Product name is required',
  })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsPositive({
    message: 'Price must be greater than 0',
  })
  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  @IsNotEmpty({
    message: 'Product price is required',
  })
  price!: number;

  @IsPositive({
    message: 'User ID must be greater than 0',
  })
  @IsInt({
    message: 'User ID must be an integer',
  })
  @IsNotEmpty({
    message: 'User ID is required',
  })
  userId!: number;

  @IsPositive({
    message: 'Category ID must be greater than 0',
  })
  @IsInt({
    message: 'Category ID must be an integer',
  })
  @IsNotEmpty({
    message: 'Category ID is required',
  })
  categoryId!: number;
}
