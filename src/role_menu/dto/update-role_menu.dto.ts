import { PartialType } from '@nestjs/swagger';
import { CreateRoleMenuDto } from './create-role_menu.dto';

export class UpdateRoleMenuDto extends PartialType(CreateRoleMenuDto) {}
