import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ description: '原始文件名' })
  originalName: string;

  @ApiProperty({ description: '存储的文件名' })
  filename: string;

  @ApiProperty({ description: '文件大小(字节)' })
  size: number;

  @ApiProperty({ description: '文件类型' })
  mimeType: string;

  @ApiProperty({ description: '文件访问URL' })
  url: string;

  @ApiProperty({ description: 'OSS存储桶名称' })
  bucket: string;

  @ApiProperty({ description: 'OSS文件key' })
  key: string;
}