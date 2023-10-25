import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository, In } from 'typeorm';
import { ApiException } from '@/common/filter/http-exception/api.exception';
import { ApiErrorCode } from '@/common/enums/api-error-code.enum';
import { Permission } from '@/permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const permissions = await this.permissionRepository.find({
      where: { id: In(createRoleDto.permissionIds) },
    });

    const { role_code } = createRoleDto;
    const existRole = await this.roleRepository.findOne({
      where: { role_code },
    });
    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.ROLE_EXIST);
    return this.roleRepository.save({
      name: createRoleDto.name,
      role_code,
      permissions,
    });
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
