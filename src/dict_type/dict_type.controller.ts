import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req,Res } from '@nestjs/common';
import { DictTypeService } from './dict_type.service';
import { CreateDictTypeDto } from './dto/create-dict_type.dto';
import { UpdateDictTypeDto } from './dto/update-dict_type.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request,Response  } from 'express';
import * as XLSX from 'xlsx';

@ApiTags('字典类型')
@Controller('dict/type')
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
  @Post('export')
  async export(@Body() query: any, @Res() res: Response) {
    const data = await this.dictTypeService.export(query);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="dict_data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer); // 返回文件内容
  }
  @ApiOperation({ summary: '获取字典类型列表' })
  @ApiBody({ type: Object })
  @Get('list')
  async list(@Req() req: Request) {
    return this.dictTypeService.list(req.query);
  }
  @Get('optionselect')
  async optionselect() {
    return this.dictTypeService.optionselect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictTypeDto: UpdateDictTypeDto) {
    return this.dictTypeService.update(+id, updateDictTypeDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.dictTypeService.remove(ids);
  }
}
