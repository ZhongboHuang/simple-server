import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CacheModule } from './cache/cache.module';

const isProd = process.env.NODE_ENV == 'prod';

console.log('isProd', isProd);
console.log('NODE_ENV', process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局注册
      envFilePath: isProd ? '.env.prod' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DATABASE_HOST', 'localhost'), // 主机
        port: config.get('DATABASE_PORT', 3306), // 端口
        username: config.get('DATABASE_USERNAME', 'root'), // 用户名
        password: config.get('DATABASE_PASSWORD', '123456'), // 密码
        database: config.get('DATABASE_NAME', 'simple-database'), // 数据库名
        autoLoadEntities: true, //自动加载实体
        synchronize: true, //自动创建表
      }),
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    CacheModule,
  ],
})
export class AppModule {}
