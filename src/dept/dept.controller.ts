import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards  } from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('部门管理')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get()
  findAll() {
    return this.deptService.findAll();
  }
  @Get('deptTree')
  deptTree() {
    return this.deptService.deptTree();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(+id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }
}
