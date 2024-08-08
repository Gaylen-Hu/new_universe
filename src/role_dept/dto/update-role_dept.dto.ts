import { PartialType } from '@nestjs/swagger';
import { CreateRoleDeptDto } from './create-role_dept.dto';

export class UpdateRoleDeptDto extends PartialType(CreateRoleDeptDto) {}
