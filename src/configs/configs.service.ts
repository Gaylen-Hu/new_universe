import { Injectable } from '@nestjs/common';
import { InjectRepository , } from '@nestjs/typeorm';
import { Repository, In ,Between} from 'typeorm';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './entities/configs.entity';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}
  async create(createConfigDto: CreateConfigDto) {
    return await this.configRepository.save(createConfigDto);
  }

  async findAll() {
    return await this.configRepository.find();
  }

  async findOne(id: number) {
   return await this.configRepository.findOne({ where: { config_id : id } });
  }

  async update(id: number, updateConfigDto: UpdateConfigDto) {
     await this.configRepository.update(id, updateConfigDto);
      return this.findOne(id);
  }

  async remove(id: number) {
    await this.configRepository.delete(id);
  }
  
  async list(query: any): Promise<any> {
    const { page = 1, pageSize = 10, configName, configKey, configType, createTime, updateTime } = query;
    const where: any = {};
    if (configName) {
      where.configName = In(configName.split(','));
    }
    if (configKey) {
      where.configKey = In(configKey.split(','));
    }
    if (configType) {
      where.configType = In(configType.split(','));
    }
    if (createTime) {
      where.createTime = Between(createTime.split(',')[0], createTime.split(',')[1]);
    }
    if (updateTime) {
      where.updateTime = Between(updateTime.split(',')[0], updateTime.split(',')[1]);
    }
    const [list, total] = await this.configRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
    });
    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }

  async findByConfigKey(configKey: string) {
    return await this.configRepository.findOne({ where: {  config_key: configKey } });
  }
}
