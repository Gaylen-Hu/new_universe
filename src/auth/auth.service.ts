import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
        ) {}
    async validateUser( username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        console.log('user:', user);
        console.log('data:', user.password,password);
        const data = await bcrypt.compare(password, user.password)
        console.log('data:', data);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          msg: '操作成功',
          code: 200,
          token: this.jwtService.sign(payload),
        };
      }
      async validateUserByJwt(payload: JwtPayload): Promise<any> {
        console.log('payload:', payload);
        const user = await this.userService.findById(payload.sub);
        if (!user) {
          throw new UnauthorizedException();
        }
        console.log('user:', user);
        return user;
      }


      async validateToken(token: string): Promise<any> {
        try {
          const decoded = this.jwtService.verify(token);
          return decoded;
        } catch (error) {
          return null;
        }
      }
}
