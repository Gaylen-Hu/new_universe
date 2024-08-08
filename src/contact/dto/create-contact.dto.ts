import { IsNotEmpty, IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty({ message: '姓名不能为空' })
    @Length(1, 50, { message: '姓名长度不能超过50个字符' })
    name: string;

    @IsOptional()
    @IsEmail({}, { message: '请输入有效的邮箱地址' })
    email: string;

    @IsOptional()
    @Length(1, 255, { message: '主题长度不能超过255个字符' })
    subject: string;

    @IsNotEmpty({ message: '消息不能为空' })
    message: string;
}

