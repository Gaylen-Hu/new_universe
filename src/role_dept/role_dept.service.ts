import { Injectable } from '@nestjs/common';
import { CreateRoleDeptDto } from './dto/create-role_dept.dto';
import { UpdateRoleDeptDto } from './dto/update-role_dept.dto';

@Injectable()
export class RoleDeptService {
  create(createRoleDeptDto: CreateRoleDeptDto) {
    return 'This action adds a new roleDept';
  }

  findAll() {
    return `This action returns all roleDept`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleDept`;
  }

  update(id: number, updateRoleDeptDto: UpdateRoleDeptDto) {
    return `This action updates a #${id} roleDept`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleDept`;
  }
}
