import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListTagDto {
  @ApiPropertyOptional({ description: '标签名称', example: '技术' })
  name?: string;

  @ApiPropertyOptional({ description: '标签状态', enum: ['active', 'disabled'] })
  status?: 'active' | 'disabled';

  @ApiPropertyOptional({ description: '当前页码', example: 1 })
  pageNum?: number;

  @ApiPropertyOptional({ description: '每页条数', example: 10 })
  pageSize?: number;

  @ApiPropertyOptional({ description: '排序字段', example: 'create_time' })
  orderBy?: string;

  @ApiPropertyOptional({ description: '排序方向', enum: ['ASC', 'DESC'], example: 'DESC' })
  orderDirection?: 'ASC' | 'DESC';
}
