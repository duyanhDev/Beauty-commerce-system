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
import { Brand } from './brand.entity';
import { Country } from './country.entity';
import { Gender } from './gender.entity';

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

  @ManyToOne(() => Category, (cat) => cat.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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

  @ManyToOne(() => Brand, (b) => b.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
  @Column({ name: 'brand_id', nullable: true })
  brandId: number;

  @ManyToOne(() => Country, (cou) => cou.products)
  @JoinColumn({ name: 'country_id' })
  countrys: Country;

  @ManyToOne(() => Gender, (g) => g.products)
  @JoinColumn({ name: 'gender_id' })
  genders: Gender;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
