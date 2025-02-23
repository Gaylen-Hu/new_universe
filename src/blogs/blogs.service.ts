import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 创建博客
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { tags, ...blogData } = createBlogDto;

    // 处理标签
    let tagEntities: Tag[] = [];
    if (tags && tags.length > 0) {
      tagEntities = await this.tagRepository.find({ where: { id: In(tags) } });
      if (tagEntities.length !== tags.length) {
        throw new BadRequestException('部分标签不存在，请检查输入的标签ID');
      }
    }

    // 创建博客实例
    const blog = this.blogRepository.create({
      ...blogData,
      tags: tagEntities,
    });

    // 保存博客
    return await this.blogRepository.save(blog);
  }

  // 查询所有博客
  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({ relations: ['tags', 'stats'] });
  }

  // 通过ID查询单个博客
  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { blog_id: id },
      relations: ['tags', 'stats'],
    });
    if (!blog) {
      throw new NotFoundException(`ID 为 ${id} 的博客不存在`);
    }
    return blog;
  }

  // 更新博客
  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    const { tags, ...blogData } = updateBlogDto;

    // 处理标签
    if (tags && tags.length > 0) {
      const tagEntities = await this.tagRepository.find({ where: { id: In(tags) } });
      if (tagEntities.length !== tags.length) {
        throw new BadRequestException('部分标签不存在，请检查输入的标签ID');
      }
      blog.tags = tagEntities;
    }

    // 更新博客数据
    Object.assign(blog, blogData);
    return await this.blogRepository.save(blog);
  }

  // 删除博客
  async remove(id: number): Promise<void> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID 为 ${id} 的博客不存在`);
    }
  }

  // 查询博客列表
  async findList(query: any): Promise<any> {
    const { page = 1, pageSize = 10, title, status, tag, createTime, updateTime } = query;
    const where: any = {};
    if (title) {
      where.title = title;
    }
    if (status) {
      where.status = status;
    }
    if (tag) {
      where.tags = In(tag.split(','));
    }
    if (createTime) {
      where.createTime = createTime;
    }
    if (updateTime) {
      where.updateTime = updateTime;
    }

    const [list, total] = await this.blogRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
      relations: ['tags', 'stats'],
    });

    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
}
