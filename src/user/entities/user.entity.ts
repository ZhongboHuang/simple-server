import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import encrypt from '@/utils/crypto';
import * as crypto from 'crypto';
import { Role } from '@/role/entities/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number; // 用户id（主键）

  @Column({ length: 30 })
  username: string; // 用户名

  @Column()
  password: string; // 密码

  @Column({ nullable: true })
  salt: string; // 密码盐

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    // joinColumn: { name: 'user_id' },
    // inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  @BeforeInsert()
  setPassword() {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = encrypt(this.password, this.salt);
  }
}
