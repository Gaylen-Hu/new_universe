import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class ListBlogDto {
  @ApiPropertyOptional({ description: '当前页码', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'pageNum 最小值为 1' })
  pageNum?: number = 1;

  @ApiPropertyOptional({ description: '每页条数', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'pageSize 最小值为 1' })
  pageSize?: number = 10;

  @ApiPropertyOptional({ description: '博客语言', example: 'zh-CN' }) 
  @IsOptional() 
  @IsString()
  @MaxLength(10)
  lang?: string;


  @ApiPropertyOptional({ description: '博客标题查询', example: 'NestJS' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ description: '博客状态', example: 'published' })
  @IsOptional()
  @IsString()
  status?: string;
}
