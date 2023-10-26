import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { Role } from '@/role/entities/role.entity';
import { CacheService } from '@/cache/cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private cacheService: CacheService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password, roleIds } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new ApiException('用户名已存在', ApiErrorCode.USERNAME_EXIST);
    }
    try {
      const roles = await this.roleRepository.find({
        where: { id: In(roleIds) },
      });
      const newUser = await this.userRepository.create({
        username,
        password,
        roles,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findPermissionCodes(token: string, userInfo) {
    const user = await this.userRepository.findOne({
      where: { username: userInfo.username },
      relations: ['roles', 'roles.permissions'],
    });
    const permissionCodes = user.roles.reduce((acc, cur) => {
      acc.push(...cur.permissions.map((item) => item.permission_code));
      return acc;
    }, []);
    return permissionCodes;
  }

  async test(testParams: { msg: string }) {
    const { msg } = testParams;
    return await this.cacheService.set('message', msg);
  }
}
