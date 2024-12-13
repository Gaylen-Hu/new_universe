import { IsNotEmpty, IsOptional, IsString, IsInt, IsIn, IsBoolean, Length } from 'class-validator';

export class CreateDictDatumDto {
    
    @IsNotEmpty()
    @IsInt()
    dictSort: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    dictLabel: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    dictValue: string;

        @IsNotEmpty()
        @IsString()
        @Length(1, 100)
        dictType: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    cssClass: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    listClass: string;

    @IsNotEmpty()
    @IsIn(['Y', 'N'])
    isDefault: string;

    @IsNotEmpty()
    @IsIn(['0', '1'])
    status: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    createBy: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    update_by: string;

    @IsOptional()
    @IsString()
    @Length(0, 500)
    remark?: (() => string);
}
