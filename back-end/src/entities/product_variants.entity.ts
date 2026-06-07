import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { Product } from './product.entity';
import { VariantAttributeValue } from './variant-attribute-value.entity';
import { VariantImage } from './variant-image.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { InventoryLog } from './inventory-log.entity';

const decimalTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ length: 100, nullable: true })
  barcode?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  costPrice?: number;

  // giá gốc
  @Column({
    name: 'original_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  originalPrice: number;

  // phần trăm giảm
  @Column({
    name: 'discount_percent',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    transformer: decimalTransformer,
  })
  discountPercent: number;

  // giá sau giảm
  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  salePrice?: number;

  // thời gian bắt đầu sale
  @Column({
    name: 'sale_start_at',
    type: 'timestamp',
    nullable: true,
  })
  saleStartAt?: Date;

  // thời gian kết thúc sale
  @Column({
    name: 'sale_end_at',
    type: 'timestamp',
    nullable: true,
  })
  saleEndAt?: Date;

  // tồn kho
  @Column({ type: 'int', default: 0 })
  stock: number;

  // hàng giữ trong cart/order
  @Column({ type: 'int', default: 0 })
  reserved: number;

  // tổng đã bán
  @Column({ type: 'int', default: 0 })
  sold: number;

  // cảnh báo sắp hết hàng
  @Column({ default: 5 })
  lowStockThreshold: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  weight?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  length?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  width?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  height?: number;

  @Column({ nullable: true })
  imageThumbnail?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  note?: string;

  @OneToMany(
    () => VariantAttributeValue,
    (attributeValue) => attributeValue.variant,
    {
      cascade: true,
    },
  )
  attributeValues: VariantAttributeValue[];

  @OneToMany(() => VariantImage, (image) => image.variant, {
    cascade: true,
  })
  images: VariantImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.variant)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.variant)
  orderItems: OrderItem[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.variant)
  inventoryLogs: InventoryLog[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  // HELPERS

  get finalPrice(): number {
    const now = new Date();

    const isSaleActive =
      this.salePrice !== null &&
      this.salePrice !== undefined &&
      (!this.saleStartAt || now >= this.saleStartAt) &&
      (!this.saleEndAt || now <= this.saleEndAt);

    return isSaleActive ? Number(this.salePrice) : Number(this.originalPrice);
  }

  get profit(): number {
    return Number(this.finalPrice || 0) - Number(this.costPrice || 0);
  }

  get availableStock(): number {
    return Math.max(this.stock - this.reserved, 0);
  }

  get isLowStock(): boolean {
    return this.availableStock <= this.lowStockThreshold;
  }
}
