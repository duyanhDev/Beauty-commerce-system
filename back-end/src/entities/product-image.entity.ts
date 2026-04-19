import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (p) => p.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string;

  // 🔥 QUAN TRỌNG (bắt buộc)
  @Column({ name: 'public_id', length: 255 })
  publicId: string;

  // (optional nhưng nên có)
  @Column({ name: 'is_main', default: false })
  isMain: boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
