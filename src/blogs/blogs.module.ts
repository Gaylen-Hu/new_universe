import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity'; // 确保导入了实体
import { BlogStats } from './entities/blog-stats.entity'; // 确保导入了实体
import { Tag } from '../tag/entities/tag.entity'; // 确保导入了实体
import { AiService } from '../ai/ai.service';
import { HttpModule } from '@nestjs/axios'; // 导入 HttpModule


@Module({
  imports: [
    TypeOrmModule.forFeature([Blog,BlogStats,Tag]), // 导入实体的Repository
    HttpModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService,AiService],
  exports: [AiService],  // 如果需要在其他模块使用 AiService，可以导出它


})
export class BlogsModule {}
