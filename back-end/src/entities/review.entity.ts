import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { ReviewImage } from './review-image.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  rating: number; // 1 - 5

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @OneToMany(() => ReviewImage, (img) => img.review, { cascade: true })
  images: ReviewImage[];
}
