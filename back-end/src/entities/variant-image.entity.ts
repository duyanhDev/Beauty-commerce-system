import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductVariant } from './product_variants.entity';

@Entity('variant_images')
export class VariantImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductVariant, (v) => v.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string;
}
