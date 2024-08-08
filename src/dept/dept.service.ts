import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dept } from './entities/dept.entity';
@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private readonly deptRepository: Repository<Dept>,
  ) {}
  async create(createDeptDto: CreateDeptDto) {
    const dept = this.deptRepository.create(createDeptDto);
    return this.deptRepository.save(dept);
  }

  async findAll() {
    return this.deptRepository.find();
  }

  async findOne(id: number) {
    return this.deptRepository.findOne({ where: { deptId: id } });
  }

  async update(id: number, updateDeptDto: UpdateDeptDto) {
    await this.deptRepository.update(id, updateDeptDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.deptRepository.delete(id);
  }
}
