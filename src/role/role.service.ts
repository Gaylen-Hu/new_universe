import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository, In ,Between} from 'typeorm';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

 async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll() {
    return await this.roleRepository.find();  
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({ where: { roleId: id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.roleRepository.delete(id); 
  }
  async list(query: any): Promise<any> {
    const { page = 1, pageSize = 10, roleName, roleCode, createTime, updateTime } = query;
    const where: any = {};
    if (roleName) {
      where.roleName = In(roleName.split(','));
    }
    if (roleCode) {
      where.roleCode = In(roleCode.split(','));
    }
    if (createTime) {
      where.createTime = Between(createTime.split(',')[0], createTime.split(',')[1]);
    }
    if (updateTime) {
      where.updateTime = Between(updateTime.split(',')[0], updateTime.split(',')[1]);
    }
    const [list, total] = await this.roleRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
    });
    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
}
