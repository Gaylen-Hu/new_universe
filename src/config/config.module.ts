import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AppService } from '../app.service';
import ossConfig from './oss.config'; // 导入OSS配置



@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // 确保配置全局可用
      load: [ossConfig], // 加载OSS配置
    }),
  ],
  providers: [AppService],
  exports: [NestConfigModule],
})
export class ConfigModule {}
