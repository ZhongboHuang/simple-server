import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '@/user/user.service';
import { ApiException } from '@/common/filter/http-exception/api.exception';
import { ApiErrorCode } from '@/common/enums/api-error-code.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>('permissions', [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    if (requiredPermissions.length === 0) return true;
    const token = request.headers.authorization;

    const permissionCodes = await this.userService.findPermissionCodes(
      token,
      request.user,
    );
    console.log(requiredPermissions);
    console.log(permissionCodes);
    const isContainer = requiredPermissions.every((permission) =>
      permissionCodes.includes(permission),
    );
    console.log(isContainer);
    if (!isContainer) {
      throw new ApiException('权限不足', ApiErrorCode.FORBIDDEN);
    }
    return true;
  }
}
