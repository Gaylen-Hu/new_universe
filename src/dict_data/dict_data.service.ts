import { Injectable } from '@nestjs/common';
import { CreateDictDatumDto } from './dto/create-dict_datum.dto';
import { UpdateDictDatumDto } from './dto/update-dict_datum.dto';
import { DictDatum } from './entities/dict_datum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DictDataService {
  constructor(
    @InjectRepository(DictDatum)
    private readonly dictDatumRepository: Repository<DictDatum>,
  ) {}
  async create(createDictDatumDto: CreateDictDatumDto): Promise<DictDatum> {
    const dictDatum = this.dictDatumRepository.create(createDictDatumDto);
    return await this.dictDatumRepository.save(dictDatum);
  }

  async findAll() {
    return await this.dictDatumRepository.find();
  }

  async findOne(id: number) {
    return await this.dictDatumRepository.findOne({ where: { dictCode: id } });
  }

  async update(id: number, updateDictDatumDto: UpdateDictDatumDto) {
    await this.dictDatumRepository.update(id, updateDictDatumDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.dictDatumRepository.delete(id);
  }

  async list(query: any): Promise<any> {
    const { pageNum = 1, pageSize = 10, dictType, dictLabel } = query;
    const where: any = {};
    if (dictType) {
      where.dictType = dictType;
    }
    if (dictLabel) {
      where.dictLabel = dictLabel;
    }
    const [list, total] = await this.dictDatumRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+pageNum - 1) * +pageSize,
    });
    return {
      rows:list,
      total,
      pageNum: +pageNum,
      pageSize: +pageSize,
    };
  }
  async getDictDataByType(dictType: string) {
    return await this.dictDatumRepository.find({ where: { dictType } });
  }
}
