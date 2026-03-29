import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('variant_attribute_values')
export class VariantAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductVariant, (v) => v.attributeValues, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @ManyToOne(() => AttributeValue, (av) => av.variantAttributeValues)
  @JoinColumn({ name: 'attribute_value_id' })
  attributeValue: AttributeValue;
}
