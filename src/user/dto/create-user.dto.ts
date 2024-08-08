import { IsNotEmpty, IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: '用户名',
        example: 'admin',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @Length(1, 30)
    userName: string;

    @ApiProperty({
        description: '昵称',
        example: '管理员',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @Length(1, 30)
    nickName: string;

    @ApiProperty({
        description: '用户类型',
        example: '00',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 2)
    userType?: string = '00';

    @ApiProperty({
        description: '邮箱',
        example: 'admin@admin.com',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsEmail()
    @Length(0, 50)
    email?: string = '';


    @ApiProperty({
        description: '手机号码',
        example: '13888888888',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsPhoneNumber('CN')
    @Length(0, 11)
    phonenumber?: string = '';

    @ApiProperty({
        description: '性别',
        example: '0',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 1)
    sex?: string = '0';

    @ApiProperty({
        description: '头像',
        example: 'http://www.baidu.com',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 100)
    avatar?: string = '';

    @ApiProperty({
        description: '密码',
        example: '123456',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @Length(6, 100)
    password: string;

    @ApiProperty({
        description: '状态',
        example: '1',
        required: false,
        type: Number,
    })
    @IsOptional()
    @Length(0, 1)
    status?: string = '0';

    @ApiProperty({
        description: '删除标志',
        example: '0',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 1)
    delFlag?: string = '0';

    @ApiProperty({
        description: '最后登陆IP',
        example: '127.0.0.1',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 128)
    loginIp?: string = '';

    @ApiProperty({
        description: '最后登陆时间',
        example: '2021-01-01 00:00:00',
        required: false,
        type: Date,
    })
    @IsOptional()
    loginDate?: Date;

    @ApiProperty({
        description: '创建者',
        example: 'admin',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 64)
    createBy?: string = '';

    @ApiProperty({
        description: '创建时间',
        example: '2021-01-01 00:00:00',
        required: false,
        type: Date,
    })
    @IsOptional()
    createTime?: Date;

    @ApiProperty({
        description: '更新者',
        example: 'admin',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 64)
    updateBy?: string = '';

    @ApiProperty({
        description: '更新时间',
        example: '2021-01-01 00:00:00',
        required: false,
        type: Date,
    })
    @IsOptional()
    updateTime?: Date;

    @ApiProperty({
        description: '备注',
        example: '备注',
        required: false,
        type: String,
    })
    @IsOptional()
    @Length(0, 500)
    remark?: string = '';
}
