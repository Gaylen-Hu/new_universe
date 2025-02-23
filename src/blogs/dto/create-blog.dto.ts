import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsIn, 
  IsInt, 
  MaxLength, 
  Min, 
  IsNotEmpty, 
  IsArray, 
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  
  @ApiProperty({ description: '博客标题', example: 'My Blog Title' })
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(255, { message: '标题长度不能超过255个字符' })
  title: string;

  @ApiProperty({ description: '博客作者', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: '作者不能为空' })
  @MaxLength(255, { message: '作者名称长度不能超过255个字符' })
  author: string;

  @ApiProperty({ description: '博客内容', example: 'This is the blog content.' })
  @IsString()
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;


//   contentType
@ApiProperty({ description: '内容类型', example: 'markdown' })
@IsString()
@IsNotEmpty({ message: '内容类型不能为空' })
@MaxLength(64, { message: '内容类型长度不能超过64个字符' })
contentType: string;

  @ApiPropertyOptional({ description: '博客标签ID列表', example: [1, 2, 3] })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true, message: '标签ID必须是整数' })
  tags?: number[];

  @ApiPropertyOptional({ description: '博客摘要', example: 'This is a summary.' })
  @IsString()
  @IsOptional()
  summary?: string;
  

  @ApiPropertyOptional({ description: '博客关键词', example: 'nestjs, blog' })
  @IsString()
  @IsOptional()
  @MaxLength(255, { message: '关键词长度不能超过255个字符' })
  keywords?: string;

  @ApiPropertyOptional({ description: '博客封面图URL', example: 'https://example.com/cover.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(255, { message: '封面图URL长度不能超过255个字符' })
  cover?: string;

  @ApiProperty({ description: '文章唯一标识符', example: 'unique-identifier-123' })
  @IsString()
  @IsNotEmpty({ message: '唯一标识符不能为空' })
  @MaxLength(255, { message: '唯一标识符长度不能超过255个字符' })
  slug: string;

  @ApiPropertyOptional({ description: '博客状态', example: 'draft', enum: ['draft', 'published', 'archived'] })
  @IsIn(['draft', 'published', 'archived'], { message: '状态只能是 draft, published, archived 之一' })
  @IsOptional()
  status?: 'draft' | 'published' | 'archived';


//   lang
@ApiProperty({ description: '语言', example: 'zh-CN' })
@IsString()
@IsNotEmpty({ message: '语言不能为空' })
@MaxLength(64, { message: '语言长度不能超过64个字符' })
lang: string;


}
