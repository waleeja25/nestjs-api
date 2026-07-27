import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common';
import { User } from '../../users/entities';
import { Category } from '../../categories/entities';

@Entity('products')
export class Product extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'userId',
  })
  @Index()
  user!: User;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'categoryId',
  })
  @Index()
  category!: Category;
}
