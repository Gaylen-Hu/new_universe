import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In ,Between} from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ListTagDto } from './dto/list-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 创建标签
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;

    // 检查标签名称是否已存在
    const existingTag = await this.tagRepository.findOne({ where: { name } });
    if (existingTag) {
      throw new BadRequestException(`标签名称 "${name}" 已存在`);
    }

    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  // 获取所有标签
  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      order: { sort_order: 'ASC', create_time: 'DESC' },
    });
  }

  // 获取单个标签
  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`ID 为 ${id} 的标签不存在`);
    }
    return tag;
  }

  // 更新标签
  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id); // 先确保标签存在
    const updatedTag = Object.assign(tag, updateTagDto);
    return await this.tagRepository.save(updatedTag);
  }

  // 删除标签
  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id); // 确保标签存在
    await this.tagRepository.remove(tag);
  }

  async findList(query: ListTagDto) {
    const {
      name,
      status,
      pageNum = 1,
      pageSize = 10,
      orderBy = 'create_time',
      orderDirection = 'DESC',
    } = query;

    const skip = (pageNum - 1) * pageSize;

    const queryBuilder = this.tagRepository.createQueryBuilder('tag');

    if (name) {
      queryBuilder.andWhere('tag.name LIKE :name', { name: `%${name}%` });
    }

    if (status) {
      queryBuilder.andWhere('tag.status = :status', { status });
    }

    const [data, total] = await queryBuilder
      .orderBy(`tag.${orderBy}`, orderDirection)
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return {
      rows:data,
      total,
      pageNum,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async batchDelete(ids: number[]): Promise<void> {
    console.log(ids);
    await this.tagRepository.delete({ id: In(ids) });
  }
  async findAllWithCount(): Promise<{ name: string; count: number }[]> {
    const tagsWithCount = await this.tagRepository
    .createQueryBuilder('tag')
    .leftJoin('tag.blogs', 'blog')
    .select(['tag.name', 'COUNT(blog.blog_id) as count'])
    .groupBy('tag.id')
    .getRawMany();

  // 转换结果为所需格式
  return tagsWithCount.map(tag => ({
    name: tag.tag_name,
    count: parseInt(tag.count, 10),
  }));
  }
}
