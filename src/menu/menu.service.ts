import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { plainToClass } from 'class-transformer';


@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) { }
  async create(createMenuDto: CreateMenuDto) {
    console.log('createMenuDto', createMenuDto);
    const menus = plainToClass(Menu, createMenuDto);
    console.log('menus', menus);
    const menu = this.menuRepository.create(menus);
    console.log('menu', menu);
    return this.menuRepository.save(menu);
  }

  async findAll() {
    const menuData = await this.menuRepository.find();  // 获取数据库中的数据
    const transformedMenuData = menuData.map(menu => plainToClass(Menu, menu));
    console.log('transformedMenuData', transformedMenuData);
    return transformedMenuData;

  }

  async findOne(id: number) {
    return this.menuRepository.findOne({ where: { menu_id: id } });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menus = plainToClass(Menu, updateMenuDto);
    await this.menuRepository.update(id, menus);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.menuRepository.delete(id);
  }
  async getRouters(): Promise<any> {
    // 获取所有菜单数据
    const menus = await this.menuRepository.find({ where: { status: '0', menu_type: In(['M', 'C']) } });

    // 转换为树形结构
    const tree = this.buildTree(menus);
    return tree;
  }
  private buildTree(menus: Menu[]): any[] {
    const map = new Map<number, any>();
    const result = [];

    menus.forEach(menu => {
      const node = {
        name: menu.path,
        path: menu.menu_type == 'M' ? `/${menu.path}` : `${menu.path}`,
        hidden: menu.visible == '1',
        component: menu.menu_type == 'M' ? 'Layout' : menu.component,
        meta: {
          title: menu.menu_name,
          icon: menu.icon,
          noCache: menu.is_cache == 1,
          link: menu.is_frame == 0 ? menu.query : null,
        },
        children: [],
      };
      map.set(menu.menu_id, node);

      // 如果有父节点，加入父节点的 children，否则加入根节点
      if (menu.parent_id == 0) {
        result.push(node);
      } else {
        const parent = map.get(menu.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return result;
  }

  async treeselect(): Promise<any[]> {
    const allMenus = await this.menuRepository.find(); // 查询所有部门
    return this.buildMenuTree(allMenus, 0); // 从根节点（parentId = 0）开始构建树
  }


  async list(query: any): Promise<any> {
    const { page = 1, pageSize = 999999, menu_name, createTime, updateTime } = query;
    const where: any = {};
    if (menu_name) {
      where.menu_name = In(menu_name.split(','));
    }
    if (createTime) {
      where.createTime = Between(createTime.split(',')[0], createTime.split(',')[1]);
    }
    if (updateTime) {
      where.updateTime = Between(updateTime.split(',')[0], updateTime.split(',')[1]);
    }
    const [list, total] = await this.menuRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
    });
    return {
      rows:  list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
  private buildMenuTree(menus: Menu[], parentId: number): any[] {
    const result = [];
    for (const menu of menus.filter(d => d.parent_id == parentId)) {
      const children = this.buildMenuTree(menus, menu.menu_id); // 找到子节点
      result.push({
        id: menu.menu_id,
        label: menu.menu_name,
        children: children.length > 0 ? children : null, // 如果没有子节点返回 null
      });
    }
    return result;
  }
}
