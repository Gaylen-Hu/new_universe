import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: '获取角色列表' })
  @ApiResponse({ status: 200, description: '成功返回角色列表。' })
  @Get('list')
  async list(@Req() req: Request) {
    console.log('获取用户列表req.query', req.query);
    return this.roleService.list(req.query);
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
