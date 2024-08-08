import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MenuDto {
  @IsNumber()
  menuId: number;

  @IsString()
  menuName: string;

  @IsString()
  perms: string; // 权限标识
}

export class RoleDto {
  @IsNumber()
  roleId: number;

  @IsString()
  roleName: string;

  @IsString()
  roleKey: string;

  @IsOptional()
  menus?: MenuDto[]; // 角色的菜单权限
}

export class UserDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  deptId: number;

  @IsString()
  userName: string;

  @IsString()
  nickName: string;

  @IsString()
  email: string;

  @IsString()
  phonenumber: string;

  @IsString()
  sex: string;

  @IsString()
  avatar: string;

  @IsString()
  status: string;

  @IsOptional()
  roles?: RoleDto[];

  @IsOptional()
  roleIds?: number[];

  @IsOptional()
  dept?: {
    deptId: number;
    deptName: string;
  };
}
