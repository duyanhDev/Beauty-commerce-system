import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 , unique:true})
  name: string; // e.g. color, size, volume, skin_type

  @Column({type:"text",nullable: true })
  description: string
  @OneToMany(() => AttributeValue, (av) => av.attribute, { cascade: true })
  values: AttributeValue[];
}
