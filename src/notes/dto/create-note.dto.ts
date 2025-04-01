import { 
    IsNotEmpty, 
    IsString, 
    IsOptional, 
    IsArray, 
    IsUrl, 
    IsIn,
    MaxLength, 
    MinLength,
    ArrayMaxSize,
    ValidateNested,
    IsEnum,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  

  
  export class CreateNoteDto {
    @IsNotEmpty({ message: '内容不能为空' })
    @IsString()
    @MaxLength(2000, { message: '内容最多2000字' })
    @MinLength(1, { message: '内容至少1个字' })
    content: string;

    @IsNotEmpty({ message: '内容不能为空' })
    @IsString()
    mediaResources?: string;
    

    // locale zh-CN or en-US default zh-CN
    @IsNotEmpty({ message: '语言不能为空' })
    @IsOptional()
    @IsIn(['zh-CN', 'en-US'], { 
        message: '地区只能是 zh-CN 或 en-US' 
      })
    locale?: string;
   

    @IsString()
    tags?: string;
  
    // 以下字段不需要在创建时传入
    @IsOptional()
    readonly likeCount?: number;
  
    @IsOptional()
    readonly commentCount?: number;
  
    @IsOptional()
    @IsString()
    @MaxLength(100, { message: '定位信息过长' })
    location?: string;
  }