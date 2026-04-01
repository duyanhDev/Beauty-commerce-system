import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('category_translations')
export class CategoryTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // vi/en

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Category, (cat) => cat.translations)
  categories: Category[];
}
