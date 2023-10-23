import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number; // 用户id（主键）

  @Column({ length: 30 })
  username: string; // 用户名
  @Column()
  password: string; // 密码
}
