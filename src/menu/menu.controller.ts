import { Controller, Get, Post, Body, Patch, Put , Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request,Response  } from 'express';


@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }
    @ApiOperation({ summary: '创建菜单' })
    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @ApiOperation({ summary: '获取所有菜单' })
    @Get()
    findAll() {
        return this.menuService.findAll();
    }
    
    @ApiOperation({ summary: '获取菜单路由' })
    @Get('getRouters')
    getRouters() {
        return this.menuService.getRouters();
    }
    
    @ApiOperation({ summary: '获取菜单列表' })
    @Get('list')
    async list(@Req() req: Request) {
        const menu =  this.menuService.list(req.query);
        return menu
    }


    @ApiOperation  ({ summary: '获取菜单树' })
    @Get('treeselect')
    treeselect() {
        return this.menuService.treeselect();
    }

    @ApiOperation({ summary: '获取菜单详情' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(+id);
    }

    @ApiOperation({ summary: '更新菜单' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }

    // put
    @ApiOperation({ summary: '更新菜单' })
    @Put(':id')
    updatePut(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }

    @ApiOperation({ summary: '删除菜单' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.menuService.remove(+id);
    }
}
