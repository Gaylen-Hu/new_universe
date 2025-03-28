import { 
    IsNotEmpty, 
    IsString, 
    IsOptional, 
    IsArray, 
    IsUrl, 
    MaxLength, 
    MinLength,
    ArrayMaxSize,
    ValidateNested,
    IsEnum,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  // 媒体资源类型定义
  class MediaResourceDto {
    @IsEnum(['image', 'video', 'audio'], { message: '类型必须是 image/video/audio' })
    type: string;
  
    @IsUrl({}, { message: '必须是合法的URL地址' })
    url: string;
  
    @IsOptional()
    @IsUrl({}, { message: '缩略图必须是合法的URL' })
    thumbnail?: string;
  }
  
  export class CreateNoteDto {
    @IsNotEmpty({ message: '内容不能为空' })
    @IsString()
    @MaxLength(2000, { message: '内容最多2000字' })
    @MinLength(1, { message: '内容至少1个字' })
    content: string;

    @IsNotEmpty({ message: '内容不能为空' })
    @IsString()
    mediaResources?: string;
  
   

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