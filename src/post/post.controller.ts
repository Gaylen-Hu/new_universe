import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request,Response  } from 'express';

@ApiTags('岗位管理')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '创建岗位' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: '岗位成功创建。' })
  @ApiResponse({ status: 400, description: '请求参数无效。' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: '获取所有岗位' })
  @ApiResponse({ status: 200, description: '成功返回岗位列表。' })
  @Get()
  findAll() {
    return this.postService.findAll();
  }
  
  // 查询岗位列表
  @ApiOperation({ summary: '获取岗位列表' })
  @Get('list')
  async list(@Req() req: Request) {
    return this.postService.list(req.query);
  }

  @ApiOperation({ summary: '根据ID获取岗位' })
  @ApiResponse({ status: 200, description: '成功返回岗位信息。' })
  @ApiResponse({ status: 404, description: '岗位未找到。' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
  
  @ApiOperation({ summary: '更新岗位信息' })
  @ApiResponse({ status: 200, description: '岗位信息更新成功。' })
  @ApiResponse({ status: 404, description: '岗位未找到。' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: '删除岗位' })
  @ApiResponse({ status: 200, description: '岗位删除成功。' })
  @ApiResponse({ status: 404, description: '岗位未找到。' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
