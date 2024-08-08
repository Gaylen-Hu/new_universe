import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SysUser } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { UserRole } from '../user_role/entities/user_role.entity';
import { RoleMenu } from '../role_menu/entities/role_menu.entity';
import { AuthModule } from '../auth/auth.module'; // 确保导入 AuthModule



@Module({
  imports: [
    TypeOrmModule.forFeature([SysUser]), // 导入实体的Repository
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([UserRole]),
    TypeOrmModule.forFeature([RoleMenu]),
    AuthModule, // 导入 AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // 确保 UserService 被导出
})
export class UserModule {}
