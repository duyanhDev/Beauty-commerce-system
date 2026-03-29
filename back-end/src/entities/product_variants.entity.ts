import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { VariantAttributeValue } from './variant-attribute-value.entity';
import { VariantImage } from './variant-image.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { InventoryLog } from './inventory-log.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (p) => p.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @OneToMany(() => VariantAttributeValue, (vav) => vav.variant, {
    cascade: true,
  })
  attributeValues: VariantAttributeValue[];

  @OneToMany(() => VariantImage, (vi) => vi.variant, { cascade: true })
  images: VariantImage[];

  @OneToMany(() => CartItem, (ci) => ci.variant)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (oi) => oi.variant)
  orderItems: OrderItem[];

  @OneToMany(() => InventoryLog, (log) => log.variant)
  inventoryLogs: InventoryLog[];
}
