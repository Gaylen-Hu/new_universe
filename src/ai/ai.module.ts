import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { BlogsModule } from '../blogs/blogs.module';
import { Blog } from '../blogs/entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';  // 引入 HttpModule

@Module({
    imports: [
        HttpModule,  // 导入 HttpModule，提供 HttpService
        TypeOrmModule.forFeature([Blog]),  // 导入 Blog 实体的 Repository
    ],
    controllers: [AiController],
    providers: [AiService],  // 不需要手动提供 HttpService，它会自动通过 HttpModule 注入
})
export class AiModule {}
