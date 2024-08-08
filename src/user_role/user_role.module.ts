import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]), // 导入实
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
