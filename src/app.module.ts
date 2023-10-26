import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局注册
      envFilePath: '.env',
    }),
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
    AuthModule,
    RoleModule,
    PermissionModule,
    CacheModule,
  ],
})
export class AppModule {}
