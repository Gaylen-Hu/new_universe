import { Module } from '@nestjs/common';
import { RoleMenuService } from './role_menu.service';
import { RoleMenuController } from './role_menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role_menu.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([RoleMenu]), // 导入实
  ],
  controllers: [RoleMenuController],
  providers: [RoleMenuService],
})
export class RoleMenuModule {}
