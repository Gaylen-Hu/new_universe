import { IsString, IsInt, IsOptional, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateMenuDto {
  @IsNumberString()
  @Expose({ name: 'parentId' })
  parent_id: number;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'menuName' })
  menu_name: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'icon' })
  icon: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'menuType' })
  menu_type: string;

  @IsInt()
  @IsNotEmpty()
  @Expose({ name: 'orderNum' })
  order_num: number;

  @IsEnum([0, 1])
  @IsNotEmpty()
  @Expose({ name: 'isFrame' })
  is_frame: number;

  @IsEnum([0, 1])
  @IsNotEmpty()
  @Expose({ name: 'isCache' })
  is_cache: number;

  @IsEnum(['0', '1'])
  @IsNotEmpty()
  @Expose({ name: 'visible' })
  visible: string;

  @IsEnum(['0', '1'])
  @IsNotEmpty()
  @Expose({ name: 'status' })
  status: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'perms' })
  perms: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'remark' })
  remark: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'path' })
  path: string;
}
