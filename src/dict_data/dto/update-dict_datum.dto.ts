import { PartialType } from '@nestjs/swagger';
import { CreateDictDatumDto } from './create-dict_datum.dto';

export class UpdateDictDatumDto extends PartialType(CreateDictDatumDto) {}

