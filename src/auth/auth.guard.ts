// src\auth\auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // 从 Authorization 头中提取 token
    console.log('authorizationtoken', token);
    if (!token) {
      return false;
    }

    const user = await this.authService.validateToken(token);
    console.log('authService.validateTokenuser', user);
    if (user) {
      request.user =  {
         userId: user.sub,
         
      }; // 将用户信息附加到请求对象
      return true;
    }
    return false;
  }
}
