import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { ShippingAddress } from './shipping-address.entity';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
import { Review } from './review.entity';
import { Wishlist } from './wishlist.entity';
import { UserSession } from './user_sessions.enity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({})
  avatarUrl?: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @OneToMany(() => ShippingAddress, (addr) => addr.user)
  shippingAddresses: ShippingAddress[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Wishlist, (wl) => wl.user)
  wishlists: Wishlist[];

  @OneToMany(() => UserSession, (u) => u.user)
  sessions: UserSession[];
}
