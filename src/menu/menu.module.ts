import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity'; // 确保导入了实体
@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]), // 导入实体的Repository
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
