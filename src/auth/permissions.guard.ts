
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { SysUser } from '../user/entities/user.entity';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('PermissionsGuard');
        const request = context.switchToHttp().getRequest();
        console.log("requestrequest")
        // if (!request.user) {
        //     return true;
        //   }
          console.log('PermissionsGuard11',request);
        const userId = request.user.userId; // 假设用户信息保存在 request.user 中
        console.log('PermissionsGuard',request.user);
        console.log('PermissionsGuard',userId);
        const requiredPermissions = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler());
    
        if (!requiredPermissions) {
          // 如果没有定义所需权限，则默认允许访问
          return true;
        }
    
        // 从数据库中获取用户权限
        const userPermissions = await this.userService.findUserPermissions(userId);
    
        // 检查用户权限是否包含所需权限
        return requiredPermissions.every(permission => userPermissions.includes(permission));
      }

    
    
}