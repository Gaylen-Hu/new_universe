import { Module } from '@nestjs/common';
import { RoleDeptService } from './role_dept.service';
import { RoleDeptController } from './role_dept.controller';

@Module({
  controllers: [RoleDeptController],
  providers: [RoleDeptService],
})
export class RoleDeptModule {}
