import { IsNotEmpty, IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class CreateDeptDto {
    @IsOptional()
    parentId: number;

    @IsOptional()
    ancestors: string;

    @IsNotEmpty({ message: '部门名称不能为空' })
    @Length(1, 30, { message: '部门名称长度不能超过30个字符' })
    deptName: string;

    @IsOptional()
    orderNum: number;

    @IsOptional()
    leader: string;

    @IsOptional()
    @IsPhoneNumber('CN', { message: '请输入有效的手机号码' })
    phone: string;

    @IsOptional()
    @IsEmail({}, { message: '请输入有效的邮箱地址' })
    email: string;

    @IsOptional()
    status: string;

    @IsOptional()
    delFlag: string;

    @IsNotEmpty({ message: '创建者不能为空' })
    @Length(1, 64, { message: '创建者长度不能超过64个字符' })
    createBy: string;

    // No need to explicitly define create_time and update_time
    // as they are handled automatically by the database.

    @IsNotEmpty({ message: '更新者不能为空' })
    @Length(1, 64, { message: '更新者长度不能超过64个字符' })
    updateBy: string;
}
