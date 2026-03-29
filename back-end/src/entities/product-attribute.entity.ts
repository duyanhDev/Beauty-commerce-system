import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; // e.g. color, size, volume, skin_type

  @OneToMany(() => AttributeValue, (av) => av.attribute, { cascade: true })
  values: AttributeValue[];
}
