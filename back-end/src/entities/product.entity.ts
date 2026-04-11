import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product_variants.entity';
import { Review } from './review.entity';
import { Wishlist } from './wishlist.entity';
import { ProductTranslation } from './product-translations.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  brand: string;

  @ManyToOne(() => Category, (cat) => cat.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductVariant, (v) => v.product, { cascade: true })
  variants: ProductVariant[];

  @OneToMany(() => Review, (r) => r.product)
  reviews: Review[];

  @OneToMany(() => Wishlist, (wl) => wl.product)
  wishlists: Wishlist[];
  @OneToMany(() => ProductTranslation, (t) => t.product, { cascade: true })
  translations: ProductTranslation[];
}
