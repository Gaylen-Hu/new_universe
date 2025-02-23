import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req,Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as XLSX from 'xlsx';
import { Request,Response  } from 'express';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '用户成功创建。' })
  @ApiResponse({ status: 400, description: '请求参数无效。' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '成功返回用户列表。' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('info')
  @UseGuards(AuthGuard)
  async getUserInfo(@Req() req: any) {
    const userId = req.user?.userId; // 从请求中获取 userId
        if (!userId) {
      return {
        msg: '用户未登录',
        code: 401,
      };
    }
    
    const user = await this.userService.findUserDetails(userId);
    console.log('user',user);
    if(!user.roles||user.roles.length==0){
      user.roles = ['admin']
    }
    return user
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ status: 200, description: '成功返回用户列表。' })
  @Get('list')
  async list(@Req() req: Request) {
    return this.userService.list(req.query);
  }

  @ApiOperation({ summary: '导出用户列表' })
  @ApiResponse({ status: 200, description: '成功返回用户列表。' })
  @Post('export')
  async export(@Body() query: any, @Res() res: Response) {
    const data = await this.userService.export(query);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="dict_data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer); // 返回文件内容

  }


  
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功。' })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功。' })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }





  
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiResponse({ status: 200, description: '成功返回用户信息。' })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('findOne id111', id);

    return this.userService.findOne(+id);
  }

}
