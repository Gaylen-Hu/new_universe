import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]), // 导入实体的Repository
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
