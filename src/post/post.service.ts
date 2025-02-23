import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
 async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    return this.postRepository.findOne({ where: {postId:id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }

  async list(query: any): Promise<any> {
    const { page = 1, pageSize = 10, postName, postCode, createTime, updateTime } = query;
    const where: any = {};
    if (postName) {
      where.postName = In(postName.split(','));
    }
    if (postCode) {
      where.postCode = In(postCode.split(','));
    }
    if (createTime) {
      where.createTime = Between(createTime.split(',')[0], createTime.split(',')[1]);
    }
    if (updateTime) {
      where.updateTime = Between(updateTime.split(',')[0], updateTime.split(',')[1]);
    }
    const [list, total] = await this.postRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
    });
    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
}
