import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req, Put } from '@nestjs/common';
import { DictDataService } from './dict_data.service';
import { CreateDictDatumDto } from './dto/create-dict_datum.dto';
import { UpdateDictDatumDto } from './dto/update-dict_datum.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('字典数据')
@Controller('dict/data')
export class DictDataController {
  constructor(private readonly dictDataService: DictDataService) {}

  @Post()
  create(@Body() createDictDatumDto: CreateDictDatumDto) {
    return this.dictDataService.create(createDictDatumDto);
  }

  @Get()
  findAll() {
    return this.dictDataService.findAll();
  }
  @ApiOperation({ summary: '获取字典数据列表' })
  @ApiBody({ type: Object })
  @Get('list')
  async list(@Req() req: Request) {
    return this.dictDataService.list(req.query);
  }
  // 获取字典数据信息
  @Get('/type/:typename')
  async getDictDataByType(@Param('typename') typename: string) {
    console.log('typename', typename);
    return this.dictDataService.getDictDataByType(typename);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictDatumDto: UpdateDictDatumDto) {
    return this.dictDataService.update(+id, updateDictDatumDto);
  }
  @Put(':id')
  update2(@Param('id') id: string, @Body() updateDictDatumDto: UpdateDictDatumDto) {
    return this.dictDataService.update(+id, updateDictDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictDataService.remove(+id);
  }
}
