
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { SysUser } from '../user/entities/user.entity';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log('request.user', 111111111);
        const request = context.switchToHttp().getRequest();
        // if (!request.user) {
        //     return true;
        //   }
       
        const userId = request.user.userId; // 假设用户信息保存在 request.user 中
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