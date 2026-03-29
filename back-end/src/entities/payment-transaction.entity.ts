import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('payment_transactions')
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.paymentTransactions)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'payment_method', length: 50 })
  paymentMethod: string; // cod | vnpay | momo | stripe

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 50 })
  status: string; // pending | success | failed | refunded

  @Column({ name: 'transaction_code', length: 255, nullable: true })
  transactionCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
