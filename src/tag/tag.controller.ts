import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query 
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ListTagDto } from './dto/list-tag.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { BatchDeleteDto } from './dto/batch-delete.dto';  // 引入 DTO


@ApiTags('标签管理') // Swagger 分组名称
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  
  @Post('batchDelete')
  @ApiOperation({ summary: '批量删除标签', description: '通过 ID 批量删除标签' })
  @ApiResponse({ status: 200, description: '标签删除成功' })
  @ApiResponse({ status: 404, description: '标签未找到' })
  async batchDelete(@Body() batchDeleteDto: BatchDeleteDto) {
    console.log(batchDeleteDto.ids);  // 输出传入的 ids 数组
    return await this.tagService.batchDelete(batchDeleteDto.ids);
  }


  @Get('list')
  @ApiOperation({ summary: '获取标签列表（分页）', description: '分页获取标签列表，并支持条件查询' })
  @ApiResponse({
    status: 200,
    description: '返回分页标签数据',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: '技术',
            description: '技术相关标签',
            status: 'active',
            sort_order: 1,
            create_time: '2024-06-15T10:00:00.000Z',
            update_time: '2024-06-15T10:00:00.000Z',
          },
        ],
        total: 1,
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
      },
    },
  })
  async findList(@Query() query: ListTagDto) {
    return await this.tagService.findList(query);
  }
  
  @Post()
  @ApiOperation({ summary: '创建标签', description: '添加一个新的标签' })
  @ApiBody({
    description: '创建标签的数据',
    type: CreateTagDto,
  })
  @ApiResponse({ status: 201, description: '标签创建成功', type: Tag })
  @ApiResponse({ status: 400, description: '标签名称已存在' })
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有标签', description: '返回所有标签数据（不分页）' })
  @ApiResponse({
    status: 200,
    description: '返回所有标签数据',
    type: [Tag],
  })
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个标签', description: '通过 ID 获取标签信息' })
  @ApiResponse({
    status: 200,
    description: '返回单个标签数据',
    type: Tag,
  })
  @ApiResponse({ status: 404, description: '标签未找到' })
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新标签', description: '通过 ID 更新标签信息' })
  @ApiBody({
    description: '更新标签的数据',
    type: UpdateTagDto,
  })
  @ApiResponse({ status: 200, description: '标签更新成功', type: Tag })
  @ApiResponse({ status: 404, description: '标签未找到' })
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagService.update(+id, updateTagDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: '删除标签', description: '通过 ID 删除标签' })
  @ApiResponse({ status: 200, description: '标签删除成功' })
  @ApiResponse({ status: 404, description: '标签未找到' })
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(+id);
  }
}
