import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, IsDateString, Matches } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  postCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  postName: string;

  @IsNotEmpty()
  @IsInt()
  postSort: number;

  @IsNotEmpty()
  @Matches(/^[01]$/)
  @MaxLength(1)
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  createBy: string;

 
  @IsOptional()
  createTime?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  updateBy: string;

  @IsOptional()
    updateTime?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  remark: string;
}
