import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common';
import { Product } from '../../products';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;
  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];
}
