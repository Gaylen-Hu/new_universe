import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sadsds', // 替换为你的密钥
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('validateuse3352352352', user);
    return { ...user, userId: user.userId };
  }
}
