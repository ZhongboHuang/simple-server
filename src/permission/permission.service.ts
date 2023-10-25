import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { ApiException } from '@/common/filter/http-exception/api.exception';
import { ApiErrorCode } from '@/common/enums/api-error-code.enum';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const { permission_code } = createPermissionDto;
    const existPermission = await this.permissionRepository.findOne({
      where: { permission_code },
    });
    if (existPermission)
      throw new ApiException('权限已存在', ApiErrorCode.PERMISSION_EXIST);
    return await this.permissionRepository.save(createPermissionDto);
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
