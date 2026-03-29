import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';
import { VariantAttributeValue } from './variant-attribute-value.entity';

@Entity('attribute_values')
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductAttribute, (attr) => attr.values, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attribute_id' })
  attribute: ProductAttribute;

  @Column({ length: 100 })
  value: string; // e.g. "Red", "50ml", "Oily"

  @OneToMany(() => VariantAttributeValue, (vav) => vav.attributeValue)
  variantAttributeValues: VariantAttributeValue[];
}
