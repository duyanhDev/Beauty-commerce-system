import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity('role_permissions')
@Unique(['role', 'permission'])
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role: Role;

  @Index()
  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  permission: Permission;

  @Column({ nullable: true })
  assignedBy: number;

  @CreateDateColumn()
  assignedAt: Date;
}
