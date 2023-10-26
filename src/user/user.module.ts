import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '@/role/entities/role.entity';
import { CacheModule } from '@/cache/cache.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CacheModule, TypeOrmModule.forFeature([User, Role])],
  exports: [UserService],
})
export class UserModule {}
