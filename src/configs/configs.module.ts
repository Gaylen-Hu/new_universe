import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/configs.entity'; // 使用正确的实体名

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  controllers: [ConfigsController],
  providers: [ConfigsService],
})
export class ConfigsModule {}
