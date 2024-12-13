import { Injectable } from '@nestjs/common';
import { InjectRepository , } from '@nestjs/typeorm';
import { Repository, In ,Between} from 'typeorm';
import { SysUser } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { UserRole } from '../user_role/entities/user_role.entity';
import { RoleMenu } from '../role_menu/entities/role_menu.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto, RoleDto, MenuDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { userInfo } from 'os';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser)
    private readonly userRepository: Repository<SysUser>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SysUser> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,  // 使用加密后的密码
    });
    return await this.userRepository.save(user);

  }

  async findAll(): Promise<SysUser[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<SysUser> {
    console.log('findOne id', id);
    return await this.userRepository.findOne({ where: { userId: id } });
  }
  async findById(id: number): Promise<SysUser> {
    console.log('findById id', id);
    return await this.userRepository.findOne({ where: { userId: id } });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<SysUser> {
    await this.userRepository.update(userId, updateUserDto);
    return this.findOne(userId);
  }

  async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
  async findByUsername(username: string): Promise<SysUser> {
    return await this.userRepository.findOne({ where: { userName: username } });
  }

  // 通过用户id查找在userrole表中的所有角色
  // 获取角色的所有菜单
  // 角色和菜单通过role_menu表关联
  // 获取菜单的所有权限(菜单表下的perms字段)

  async findUserPermissions(userId: number): Promise<string[]> {
    console.log('findUserPermissions userId', userId);
    // Step 1: 查找用户的所有角色
    const userRoles = await this.userRoleRepository.find({ where: { userId } });
    const roleIds = userRoles.map(ur => ur.roleId);

    // Step 2: 查找角色关联的所有菜单
    const roleMenus = await this.roleMenuRepository.find({ where: { roleId: In(roleIds) } });
    const menuIds = roleMenus.map(rm => rm.menuId);

    // Step 3: 获取菜单的所有权限
    const menus = await this.menuRepository.find({ where: { menu_id: In(menuIds) } });
    const permissions = menus.map(menu => menu.perms).filter(perms => perms != null);

    return permissions;
  }
  async export(query: any): Promise<any> {
    const { userName, phonenumber, params } = query;
    const where: any = {};
    if (userName) {
      where.userName = userName;
    }
    if (phonenumber) {
      where.phonenumber = phonenumber;
    }
    if (params) {
      if (params.beginTime && params.endTime) {
        where.createTime = Between(params.beginTime, params.endTime);
      }
    }
    const users = await this.userRepository.find({ where });
    return users;
  }
  
  async findUserDetails(userId: number): Promise<any> {
    console.log('findUserDetails userId', userId);
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      return {
        msg: '用户未找到',
        code: 404,
      };
    }
   
    // 获取用户角色
    const userRoles = await this.userRoleRepository.find({ where: { userId }, relations: ['role'] });
    const roleIds = userRoles.map(userRole => userRole.roleId);
    // 获取角色
    const roles = await this.roleRepository.find({ where: { roleId: In(roleIds) } });
    // 获取角色的菜单权限
    const roleMenus = await this.roleMenuRepository.find({ where: { roleId: In(roleIds) } });
    const menuIds = roleMenus.map(roleMenu => roleMenu.menuId);

    // 获取菜单
    const menus = await this.menuRepository.find({ where: { menu_id: In(menuIds) } });
    let permissions = ["*:*:*"]
    // 如果userId是1，那么就是超级管理员
    if (userId != 1) {
      permissions = menus.map(menu => menu.perms).filter(perms => perms != null);
    }
   

    const rolesDto: RoleDto[] = roles.map(role => ({
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      // 在角色中不直接包含菜单信息
    }));
    const userDto: UserDto = {
      userId: user.userId,
      deptId: user.deptId, // 可能需要根据 deptId 查询部门详细信息
      userName: user.userName,
      nickName: user.nickName,
      email: user.email,
      phonenumber: user.phonenumber,
      sex: user.sex,
      avatar: user.avatar,
      status: user.status,
      roles: rolesDto,
      roleIds: roleIds,
    };
    return {
      msg: '操作成功',
      code: 200,
      permissions,
      roles: rolesDto.map(role => role.roleKey),
      user: userDto,
    };
  }
  async list(query: any): Promise<any> {
    const { pageNum, pageSize, userName, phonenumber, params } = query;
    const where: any = {};
    if (userName) {
      where.userName = userName;
    }
    if (phonenumber) {
      where.phonenumber = phonenumber;
    }
    if (params) {
      if (params.beginTime && params.endTime) {
        where.createTime = Between(params.beginTime, params.endTime);
      }
    }
    const [users, total] = await this.userRepository.findAndCount({
      where,
      order: { createTime: 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    });
    return {
      msg: '查询成功',
      code: 200,
      rows: users,
      total,
    };
  }
 

}
