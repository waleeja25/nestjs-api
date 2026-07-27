import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common';
import { Product } from '../../products/entities';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
