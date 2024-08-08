import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // 导入实体的Repository
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
