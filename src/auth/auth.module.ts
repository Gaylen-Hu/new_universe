// src\auth\auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard'; 

@Module({
  imports: [
    forwardRef(() => UserModule), // 使用 forwardRef 避免循环依赖,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard], // 确保导出 AuthService 和 AuthGuard
})
export class AuthModule {}
