import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards ,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    console.log('req.user', req);
    console.log('getUserInfo 方法被调用');
    console.log(req.user);
    const userId = req.user?.userId; // 从请求中获取 userId
        if (!userId) {
      return {
        msg: '用户未登录',
        code: 401,
      };
    }
    return this.userService.findUserDetails(userId);
  }



  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiResponse({ status: 200, description: '成功返回用户信息。' })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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



 
  
  // @ApiOperation({ summary: '获取用户信息' })
  // @ApiResponse({ status: 200, description: '成功返回用户信息。' })
  // @ApiResponse({ status: 401, description: '用户未登录。' })
  // @Get('info')
  // @UseGuards(AuthGuard)
  // async getUserInfo(@Req() req: any) {
  //   console.log('req.user', req);
  //   console.log(req.user);
  //   const userId = req.user?.userId; // 从请求中获取 userId
  //   if (!userId) {
  //     return {
  //       msg: '用户未登录',
  //       code: 401,
  //     };
  //   }
  //   return this.userService.findUserDetails(userId);
  // }
}
