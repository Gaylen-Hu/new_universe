import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In, Between } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
const { STS } = require('ali-oss');

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getOssStsToken() {
    const sts = new STS({
      accessKeyId: this.configService.get('OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('OSS_ACCESS_KEY_SECRET'),
    });

    try {
      const result = await sts.assumeRole(
        this.configService.get('OSS_ROLE_ARN'),
        this.getPolicy(),
        this.configService.get('OSS_DURATION_SECONDS', '3600'),
        this.configService.get('OSS_ROLE_SESSION_NAME', 'nestjs-sts-session')
      );

      return {
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration,
        Region: this.configService.get('OSS_REGION'),
        Bucket: this.configService.get('OSS_BUCKET'),
      };
    } catch (error) {
      throw new Error(`STS Error: ${error.message}`);
    }
  }
  private getPolicy() {
    const bucket = this.configService.get('OSS_BUCKET');
    return JSON.stringify({
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['oss:PutObject'],
          Resource: [`acs:oss:*:*:${bucket}/*`],
        },
      ],
    });
  }

  /**
   * 创建文件记录（仅数据库）
   */
  async create(createFileDto: CreateFileDto): Promise<File> {
    const file = this.fileRepository.create({
      ...createFileDto,
      // 自动生成必要字段（如有需要）
      createdAt: new Date()
    });
    return this.fileRepository.save(file);
  }

  /**
   * 分页查询文件列表
   */
  async paginate({
    page = 1,
    limit = 10,
    mimeType,
    keyword,
    startDate,
    endDate
  }: PaginationDto) {
    const where: any = {};
    
    // 文件类型筛选
    if (mimeType) {
      where.mimeType = mimeType.includes(',') 
        ? In(mimeType.split(',')) 
        : mimeType;
    }
    
    // 关键词搜索（文件名或描述）
    if (keyword) {
      where.originalName = Like(`%${keyword}%`);
    }

    // 时间范围筛选
    if (startDate && endDate) {
      where.createdAt = Between(
        new Date(startDate),
        new Date(endDate)
      );
    }

    const [items, total] = await this.fileRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * 获取单个文件详情
   */
  async findOne(id: number): Promise<File> {
    const file = await this.fileRepository.findOne({ 
      where: { id },
      // 可以添加关联查询（如果有）
    });
    
    if (!file) {
      throw new NotFoundException(`文件ID ${id} 不存在`);
    }
    return file;
  }

  /**
   * 更新文件元信息（标题、描述等）
   */
  async update(id: number, updateFileDto: UpdateFileDto): Promise<File> {
    const file = await this.findOne(id);
    Object.assign(file, updateFileDto);
    return this.fileRepository.save(file);
  }

  /**
   * 删除文件记录（仅数据库）
   */
  async remove(id: number): Promise<void> {
    const file = await this.findOne(id);
    await this.fileRepository.remove(file);
  }

  /**
   * 批量删除文件记录
   */
  async batchRemove(ids: number[]): Promise<void> {
    const files = await this.fileRepository.find({
      where: { id: In(ids) },
    });

    if (files.length !== ids.length) {
      const foundIds = files.map(file => file.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(
        `以下文件ID不存在: ${missingIds.join(', ')}`
      );
    }

    await this.fileRepository.remove(files);
  }

  

  /**
   * 获取最近上传的文件
   */
  async getRecentFiles(limit = 5): Promise<File[]> {
    return this.fileRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  /**
   * 按类型统计文件数量
   */
  async countByType(): Promise<{ type: string; count: number }[]> {
    return this.fileRepository
      .createQueryBuilder('file')
      .select('file.mimeType', 'type')
      .addSelect('COUNT(file.id)', 'count')
      .groupBy('file.mimeType')
      .getRawMany();
  }
}