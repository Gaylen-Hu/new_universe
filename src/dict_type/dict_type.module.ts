import { Module } from '@nestjs/common';
import { DictTypeService } from './dict_type.service';
import { DictTypeController } from './dict_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictType } from './entities/dict_type.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([DictType]), // 导入实体的Repository
  ],
  controllers: [DictTypeController],
  providers: [DictTypeService],
})
export class DictTypeModule {}
