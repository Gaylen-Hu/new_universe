import { Controller, Get, Post, Body, Query, Param, Delete, Patch } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiTags('文件管理')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('sts-token')
  @ApiOperation({ 
    summary: '获取阿里云OSS临时访问凭证',
    description: '获取具有有限权限的临时访问凭证，用于前端直接上传文件到OSS'
  })
  @ApiResponse({ 
    status: 200, 
    description: '返回STS Token、临时AccessKey等信息',
    schema: {
      example: {
        accessKeyId: 'STS.xxxxxx',
        accessKeySecret: 'xxxxxx',
        stsToken: 'xxxxxx',
        region: 'oss-cn-hangzhou',
        bucket: 'your-bucket'
      }
    }
  })
  async getOssStsToken() {
    return this.fileService.getOssStsToken();
  }

  @Post()
  @ApiOperation({ 
    summary: '创建文件记录', 
    description: '将上传成功的文件信息保存到数据库'
  })
  @ApiBody({ type: CreateFileDto })
  @ApiResponse({ 
    status: 201, 
    description: '文件记录创建成功',
    type: CreateFileDto
  })
  @ApiResponse({ 
    status: 400, 
    description: '参数验证失败' 
  })
  async create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '分页查询文件列表', 
    description: '获取文件列表，支持分页和条件查询'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '页码',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '每页数量',
    example: 10
  })
  @ApiQuery({
    name: 'mimeType',
    required: false,
    description: '按文件类型过滤',
    example: 'image/jpeg'
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: '搜索关键词(匹配文件名或描述)',
    example: 'profile'
  })
  @ApiResponse({ 
    status: 200, 
    description: '返回文件列表',
    schema: {
      example: {
        items: [
          {
            id: 1,
            originalName: 'profile.jpg',
            url: 'https://example.com/profile.jpg',
            mimeType: 'image/jpeg',
            size: 1024,
            createdAt: '2023-01-01T00:00:00.000Z'
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      }
    }
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('mimeType') mimeType?: string,
    @Query('keyword') keyword?: string
  ) {
    return this.fileService.paginate({
      page,
      limit,
      mimeType,
      keyword
    });
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '获取文件详情', 
    description: '根据ID获取文件完整信息'
  })
  @ApiParam({
    name: 'id',
    description: '文件ID',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: '返回文件详细信息',
    type: CreateFileDto
  })
  @ApiResponse({ 
    status: 404, 
    description: '文件不存在' 
  })
  async findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: '更新文件信息', 
    description: '更新文件描述信息或元数据'
  })
  @ApiParam({
    name: 'id',
    description: '文件ID',
    example: 1
  })
  @ApiBody({ type: UpdateFileDto })
  @ApiResponse({ 
    status: 200, 
    description: '文件信息更新成功',
    type: CreateFileDto
  })
  @ApiResponse({ 
    status: 404, 
    description: '文件不存在' 
  })
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto
  ) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: '删除文件', 
    description: '删除数据库记录和OSS存储中的文件'
  })
  @ApiParam({
    name: 'id',
    description: '文件ID',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: '文件删除成功' 
  })
  @ApiResponse({ 
    status: 404, 
    description: '文件不存在' 
  })
  async remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }

}