import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictDataService } from './dict_data.service';
import { CreateDictDatumDto } from './dto/create-dict_datum.dto';
import { UpdateDictDatumDto } from './dto/update-dict_datum.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('字典数据')
@Controller('dict-data')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictDatumDto: UpdateDictDatumDto) {
    return this.dictDataService.update(+id, updateDictDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictDataService.remove(+id);
  }
}
