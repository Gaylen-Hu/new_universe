import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigDto {
  @ApiProperty({ description: '参数名称', example: '系统名称' })
  @IsNotEmpty({ message: '参数名称不能为空' })
  @Length(1, 100, { message: '参数名称长度必须在 1 到 100 之间' })
  configName: string;

  @ApiProperty({ description: '参数键名', example: 'sys_name' })
  @IsNotEmpty({ message: '参数键名不能为空' })
  @Length(1, 100, { message: '参数键名长度必须在 1 到 100 之间' })
  configKey: string;

  @ApiProperty({ description: '参数键值', example: 'MyApp' })
  @IsNotEmpty({ message: '参数键值不能为空' })
  @Length(1, 500, { message: '参数键值长度必须在 1 到 500 之间' })
  configValue: string;

  @ApiProperty({ description: '系统内置（Y是 N否）', example: 'N', default: 'N' })
  @IsNotEmpty({ message: '系统内置标识不能为空' })
  @Length(1, 1, { message: '系统内置标识长度必须为 1' })
  configType: string;

  @ApiProperty({ description: '备注', example: '这是一个系统配置项', required: false })
  @IsOptional()
  @Length(0, 500, { message: '备注长度不能超过 500 字符' })
  remark?: string;
}
