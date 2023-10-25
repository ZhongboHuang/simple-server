import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  role_code: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission',
    // joinColumn: { name: 'role_id' },
    // inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];
}
