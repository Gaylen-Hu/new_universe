import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([Dept]), // 导入实体的Repository
  ],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
