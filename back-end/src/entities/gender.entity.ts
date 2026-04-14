import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '@/pipe/gender';
import { Product } from './product.entity';
@Entity('gender')
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: GenderEnum,
    default: GenderEnum.OTHER,
  })
  gender: Gender;

  @OneToMany(() => Product, (g) => g.genders)
  products: Product;
}
