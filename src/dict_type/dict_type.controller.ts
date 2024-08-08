import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictTypeService } from './dict_type.service';
import { CreateDictTypeDto } from './dto/create-dict_type.dto';
import { UpdateDictTypeDto } from './dto/update-dict_type.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('字典类型')
@Controller('dict-type')
export class DictTypeController {
  constructor(private readonly dictTypeService: DictTypeService) {}

  @Post()
  create(@Body() createDictTypeDto: CreateDictTypeDto) {
    return this.dictTypeService.create(createDictTypeDto);
  }

  @Get()
  findAll() {
    return this.dictTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictTypeDto: UpdateDictTypeDto) {
    return this.dictTypeService.update(+id, updateDictTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictTypeService.remove(+id);
  }
}
