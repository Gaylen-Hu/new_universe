import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn, IsInt, MaxLength, Min, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        description: '标签名称',
        example: '技术',
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: '标签名称长度不能超过50个字符' })
    readonly name: string;

    @ApiPropertyOptional({
        description: '标签描述',
        example: '与编程和技术相关的标签',
        maxLength: 255,
    })
    @IsString()
    @IsOptional()
    @MaxLength(255, { message: '标签描述长度不能超过255个字符' })
    readonly description?: string;

    @ApiPropertyOptional({
        description: '标签状态',
        example: 'active',
        enum: ['active', 'disabled'],
        default: 'active',
    })
    @IsIn(['active', 'disabled'], { message: '状态只能是 active 或 disabled' })
    @IsOptional()
    readonly status?: 'active' | 'disabled';

    @ApiPropertyOptional({
        description: '排序值',
        example: 1,
        minimum: 0,
    })
    @IsInt()
    @Min(0, { message: '排序值不能小于0' })
    @IsOptional()
    readonly sort_order?: number;

    @ApiPropertyOptional({
        description: '标签样式类',
        example: 'tag-primary',
        maxLength: 20,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20, { message: '样式类长度不能超过20个字符' })
    readonly class?: string;
}
