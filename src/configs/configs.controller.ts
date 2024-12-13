import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req,Res } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request,Response  } from 'express';

@ApiTags('配置管理')
@Controller('config')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}


  @ApiOperation({ summary: '创建配置' })
  @ApiBody({ type: CreateConfigDto })
  @ApiResponse({ status: 201, description: '配置成功创建。' })
  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configsService.create(createConfigDto);
  }

  @ApiOperation({ summary: '获取所有配置' })
  @Get()
  findAll() {
    return this.configsService.findAll();
  }

  @ApiOperation({ summary: '获取配置列表' })
  @Get('list')
  async list(@Req() req: Request) {
    return this.configsService.list(req.query);
  }
  // 根据配置名获取配置
  @ApiOperation({ summary: '根据配置名获取配置' })
  @Get('/configKey/:configKey')
  async findByConfigKey(@Param('configKey') configKey: string) {
    return this.configsService.findByConfigKey(configKey);
  }

  @ApiOperation({ summary: '获取配置详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configsService.findOne(+id);
  }

  @ApiOperation({ summary: '更新配置' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configsService.update(+id, updateConfigDto);
  }
  @ApiOperation({ summary: '删除配置' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configsService.remove(+id);
  }
}
