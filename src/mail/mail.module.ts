import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
@Module({
    providers: [MailService],
    exports: [MailService], // 导出 MailService 以便在其他模块中使用
  })
  export class MailModule {}
