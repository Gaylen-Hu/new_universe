import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  roleName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  roleKey: string;

  @IsNotEmpty()
  @IsInt()
  roleSort: number;

  @IsOptional()
  @Matches(/^[1234]$/)
  @MaxLength(1)
  dataScope: string = '1';

  @IsOptional()
  @IsInt()
  menuCheckStrictly: number = 1;

  @IsOptional()
  @IsInt()
  deptCheckStrictly: number = 1;

  @IsNotEmpty()
  @Matches(/^[01]$/)
  @MaxLength(1)
  status: string;

  @IsOptional()
  @Matches(/^[02]$/)
  @MaxLength(1)
  delFlag: string = '0';

  @IsOptional()
  @IsString()
  @MaxLength(64)
  createBy: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(64)
  updateBy: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  remark: string;
}
