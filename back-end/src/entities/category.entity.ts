import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { CategoryTranslation } from './category_translations.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  slug: string;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => CategoryTranslation, (t) => t.category, { cascade: true })
  translations: CategoryTranslation[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
