import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true, //自动加载实体
      synchronize: true, //自动创建表
      host: 'localhost',
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: '123456', // 密码
      database: 'simple-database', //数据库名
    }),
    UserModule,
  ],
})
export class AppModule {}
