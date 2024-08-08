import { Injectable } from '@nestjs/common';
import { CreateRoleMenuDto } from './dto/create-role_menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role_menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleMenu } from './entities/role_menu.entity';
@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}
  create(createRoleMenuDto: CreateRoleMenuDto) {
    const roleMenu = this.roleMenuRepository.create(createRoleMenuDto);
    return this.roleMenuRepository.save(roleMenu);
  }

  findAll() {
    return this.roleMenuRepository.find()
  }

  findOne(id: number) {
  }

  update(id: number, updateRoleMenuDto: UpdateRoleMenuDto) {
    return `This action updates a #${id} roleMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleMenu`;
  }
}
