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
        const data = await bcrypt.compare(password, user.password)
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    }
    async login(user: any) {
      console.log('loginuser', user);
        const payload = { username: user.username, sub: user.userId };
        return {
          msg: '操作成功',
          code: 200,
          token: this.jwtService.sign(payload),
        };
      }
      async validateUserByJwt(payload: JwtPayload): Promise<any> {
        console.log('validateUserByJwtpayload', payload);
        const user = await this.userService.findById(payload.sub);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }


      async validateToken(token: string): Promise<any> {
        try {
          const decoded = this.jwtService.verify(token);

          console.log('decoded', decoded);
          return decoded;
        } catch (error) {
          return null;
        }
      }
}
