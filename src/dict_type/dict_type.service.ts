import { Injectable } from '@nestjs/common';
import { CreateDictTypeDto } from './dto/create-dict_type.dto';
import { UpdateDictTypeDto } from './dto/update-dict_type.dto';
import { DictType } from './entities/dict_type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In ,Between} from 'typeorm';


@Injectable()
export class DictTypeService {
  // 这段代码是在 TypeScript 中使用 TypeORM 和 NestJS 创建的构造函数。在这个构造函数中，我们注入了一个 Repository<DictType> 类型的依赖。

  // 首先，我们使用 @InjectRepository(DictType) 装饰器来告诉 NestJS 我们想要注入一个与 DictType 实体相关的仓库。@InjectRepository 是 TypeORM 提供的一个装饰器，用于在 NestJS 中注入仓库。
  
  // 然后，我们声明了一个名为 dictTypeRepository 的私有只读属性，它的类型是 Repository<DictType>。这意味着我们可以在这个类的其他方法中使用 this.dictTypeRepository 来访问这个仓库，并通过它来进行数据库操作。
  
  // 总的来说，这段代码的目的是通过依赖注入的方式，将与 DictType 实体相关的仓库注入到这个类中，以便我们可以在这个类中进行数据库操作。

  constructor(
    @InjectRepository(DictType)
    private readonly dictTypeRepository: Repository<DictType>,
  ) {}
  async create(createDictTypeDto: CreateDictTypeDto) {
    const dictType = this.dictTypeRepository.create(createDictTypeDto);
    return await this.dictTypeRepository.save(dictType);
  }

  async findAll() {
    return await this.dictTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.dictTypeRepository.findOne({ where: { dictId: id } });
  }

  async update(id: number, updateDictTypeDto: UpdateDictTypeDto) {
    await this.dictTypeRepository.update(id, updateDictTypeDto);
    return this.findOne(id);
  }

  async remove(ids: string) {
    const idArr = ids.split(',');
    for (let i = 0; i < idArr.length; i++) {
      const id = idArr[i];
      const dictType = await this.dictTypeRepository.delete(id);
      if (!dictType) {
        return { status: 1, message: '数据不存在' };
      }
    }
  }

  async list(query: any): Promise<any> {
    const { pageNum = 1, pageSize = 10, dictName, dictType, beginTime, endTime } = query;
    const where: any = {};
    if (dictName) {
      where.dictName = In(dictName.split(','));
    }
    if (dictType) {
      where.dictType = In(dictType.split(','));
    }
    if (beginTime) {
      where.createTime = Between(beginTime.split(',')[0], beginTime.split(',')[1]);
    }
    if (endTime) {
      where.updateTime = Between(endTime.split(',')[0], endTime.split(',')[1]);
    }
    const [list, total] = await this.dictTypeRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+pageNum - 1) * +pageSize,
    });
    return {
      rows: list,
      total,
      pageNum: +pageNum,
      pageSize: +pageSize,
    };

  }
  async optionselect() {
    return await this.dictTypeRepository.find();
  }
  async export(query: any) {
    const { dictName, dictType, beginTime, endTime } = query;
    const where: any = {};
    if (dictName) {
      where.dictName = In(dictName.split(','));
    }
    if (dictType) {
      where.dictType = In(dictType.split(','));
    }
    if (beginTime) {
      where.createTime = Between(beginTime.split(',')[0], beginTime.split(',')[1]);
    }
    if (endTime) {
      where.updateTime = Between(endTime.split(',')[0], endTime.split(',')[1]);
    }
    const list = await this.dictTypeRepository.find({
      where,
    });
    return list;
  }
}
