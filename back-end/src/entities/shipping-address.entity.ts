import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('shipping_addresses')
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shippingAddresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'receiver_name', length: 255 })
  receiverName: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 100 })
  ward: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;
}
