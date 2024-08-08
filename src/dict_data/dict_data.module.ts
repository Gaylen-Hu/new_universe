import { Module } from '@nestjs/common';
import { DictDataService } from './dict_data.service';
import { DictDataController } from './dict_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictDatum } from './entities/dict_datum.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([DictDatum]), // 导入实体的Repository
  ],
  controllers: [DictDataController],
  providers: [DictDataService],
})
export class DictDataModule {}
