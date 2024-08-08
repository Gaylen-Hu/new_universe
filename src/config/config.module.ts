import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AppService } from '../app.service';



@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // 确保配置全局可用
    }),
  ],
  providers: [AppService],
  exports: [NestConfigModule],
})
export class ConfigModule {}
