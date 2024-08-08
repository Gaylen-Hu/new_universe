import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, IsDateString, Matches } from 'class-validator';

export class CreateDictTypeDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    dictName: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    dictType: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(500)
    remark: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(64)
    createBy: string;
    
    @IsOptional()
    @IsDateString()
    createTime: Date;
    
    @IsOptional()
    @IsString()
    @MaxLength(64)
    updateBy: string;
    
    @IsOptional()
    @IsDateString()
    updateTime: Date;
    
    @IsOptional()
    @IsString()
    @MaxLength(1)
    status: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(1)
    delFlag: string;
}
