import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ProductVariant } from './product_variants.entity';

@Entity('inventory_logs')
export class InventoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductVariant, (v) => v.inventoryLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Column({ name: 'change_amount', type: 'int' })
  changeAmount: number; // dương = nhập kho, âm = xuất kho

  @Column({ length: 255, nullable: true })
  reason: string; // e.g. "order_placed", "manual_adjust", "return"

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
