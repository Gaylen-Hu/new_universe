import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Request,Response  } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('随笔管理')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: '创建随笔' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: '随笔成功创建。' })
  @ApiResponse({ status: 400, description: '请求参数无效。' })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @ApiOperation({ summary: '获取所有随笔' })
  @ApiResponse({ status: 200, description: '成功返回随笔列表。' })
  @Get()
  findAll() {
    return this.notesService.findAll();
  }
  @ApiOperation({ summary: '获取随笔列表' })
  @Get('list')

   async list(@Req() req: Request) {
    return this.notesService.list(req.query); 
  }

  @ApiOperation({ summary: '根据ID获取随笔' })
  @ApiResponse({ status: 200, description: '成功返回随笔信息。' })
  @ApiResponse({ status: 404, description: '随笔未找到。' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @ApiOperation({ summary: '更新随笔信息' })
  @ApiResponse({ status: 200, description: '随笔信息更新成功。' })
  @ApiResponse({ status: 404, description: '随笔未找到。' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @ApiOperation({ summary: '删除随笔' })
  @ApiResponse({ status: 200, description: '随笔删除成功。' })
  @ApiResponse({ status: 404, description: '随笔未找到。' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
