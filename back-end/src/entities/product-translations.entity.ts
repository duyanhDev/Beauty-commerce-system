import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_translations')
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // 'vi', 'en'

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Product, (product) => product.translations)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
