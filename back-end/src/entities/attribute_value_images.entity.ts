import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AttributeValue } from './attribute-value.entity';

@Entity('attribute_value_images')
export class AttributeValueImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AttributeValue, (av) => av.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_value_id' })
  attributeValue: AttributeValue;

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string;

  @Column({ name: 'public_id', length: 255, nullable: true })
  publicId?: string;

  @Column({ name: 'is_main', default: false })
  isMain: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
