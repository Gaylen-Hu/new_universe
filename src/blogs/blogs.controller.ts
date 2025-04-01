import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import slugify from 'slugify';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ListBlogDto } from './dto/list-blog.dto';


@ApiTags('Blogs') // 添加接口分组
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('list')
  @ApiOperation({ summary: '获取博客列表', description: '分页查询博客列表' })
  async findList(@Query() query: ListBlogDto) {
    return this.blogsService.findList(query);
  }
  // 获取推荐随笔
  @Get('recommend')
  @ApiOperation({ summary: '获取推荐博客', description: '获取推荐博客列表' })
  async recommend(@Query() query: ListBlogDto) {
    return this.blogsService.recommend(query);
  }


  @Post()
  @ApiOperation({ summary: '创建博客', description: '创建一个新的博客' })
  @ApiResponse({ status: 201, description: '博客创建成功' })
  async create(@Body() createBlogDto: CreateBlogDto) {

    const existingBlogs = await this.blogsService.findAll(); // 假设这是获取所有博客的方法
    const existingSlugs = existingBlogs.map(blog => blog.slug);
    const generateSlug = (title: string, existingSlugs: string[] = []): string => {
      if (!title || typeof title !== 'string') return '';
      
      // 1. 预处理：替换各种符号为连字符，保留中文字符
      let slug = title
        .replace(/[^\w\s\u4e00-\u9fa5-]/g, '-') // 保留已有的连字符
        .replace(/[\s_]+/g, '-') // 将空格和下划线转为连字符
        .replace(/-+/g, '-') // 合并连续的连字符
        .replace(/^-|-$/g, ''); // 移除首尾的连字符
    
      // 2. 使用更智能的slugify处理（如果可用）
      if (typeof slugify === 'function') {
        slug = slugify(slug, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g, // 移除更多特殊字符
          locale: 'zh', // 中文支持
        });
      }
    
      // 3. 确保唯一性
      if (existingSlugs && existingSlugs.includes(slug)) {
        let counter = 1;
        let uniqueSlug = `${slug}-${counter}`;
        while (existingSlugs.includes(uniqueSlug)) {
          counter++;
          uniqueSlug = `${slug}-${counter}`;
        }
        return uniqueSlug;
      }
    
      return slug;
    };
    const slug = generateSlug(createBlogDto.title, existingSlugs);
  
    console.log(' createBlogDto.summary', createBlogDto.summary);
    createBlogDto.slug = slug;
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有博客', description: '获取博客列表' })
  findAll() {
    return this.blogsService.findAll();
  }



  @Get(':id')
  @ApiOperation({ summary: '获取博客详情', description: '通过ID获取单个博客详情' })
  @ApiParam({ name: 'id', description: '博客ID', example: 1 })
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }
  @Get('slug/:slug')
  @ApiOperation({ summary: '获取博客详情', description: '通过slug获取单个博客详情' })
  @ApiParam({ name: 'slug', description: '博客slug', example: 'hello-world' })
  findOneBySlug(@Param('slug') slug: string) {
    return this.blogsService.findOneBySlug(slug);
  }
  @Patch(':id/publish')
  @ApiOperation({ summary: '发布博客', description: '通过ID发布博客' })
  @ApiParam({ name: 'id', description: '博客ID', example: 1 })
  publish(@Param('id') id: string) {
    return this.blogsService.publish(+id);
  }


  @Patch(':id')
  @ApiOperation({ summary: '更新博客', description: '通过ID更新博客信息' })
  @ApiParam({ name: 'id', description: '博客ID', example: 1 })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除博客', description: '通过ID删除博客' })
  @ApiParam({ name: 'id', description: '博客ID', example: 1 })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
  // 发布
 
}
