import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from './entities/tag.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]), // 导入实体的Repository
    
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
