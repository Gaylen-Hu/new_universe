import { Controller, Get, Post, Body } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';

@ApiTags('文件管理')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('sts-token')
  @ApiOperation({ summary: '获取阿里云OSS临时访问凭证' })
  async getOssStsToken() {
    return this.fileService.getOssStsToken();
  }

  @Post()
  @ApiOperation({ summary: '保存文件信息到数据库' })
  async create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.saveFileInfo(createFileDto);
  }
}