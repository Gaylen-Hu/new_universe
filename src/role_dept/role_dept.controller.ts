import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleDeptService } from './role_dept.service';
import { CreateRoleDeptDto } from './dto/create-role_dept.dto';
import { UpdateRoleDeptDto } from './dto/update-role_dept.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('角色部门管理')
@Controller('role-dept')
export class RoleDeptController {
  constructor(private readonly roleDeptService: RoleDeptService) {}

  @Post()
  create(@Body() createRoleDeptDto: CreateRoleDeptDto) {
    return this.roleDeptService.create(createRoleDeptDto);
  }

  @Get()
  findAll() {
    return this.roleDeptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleDeptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDeptDto: UpdateRoleDeptDto) {
    return this.roleDeptService.update(+id, updateRoleDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleDeptService.remove(+id);
  }
}
