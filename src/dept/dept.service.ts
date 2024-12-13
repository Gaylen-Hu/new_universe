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
  async deptTree(): Promise<any[]> {
    const allDepts = await this.deptRepository.find(); // 查询所有部门
    return this.buildDeptTree(allDepts, 0); // 从根节点（parentId = 0）开始构建树
  }
  private buildDeptTree(departments: Dept[], parentId: number): any[] {
    console.log('buildDeptTree departments', departments);
    const result = [];
    for (const dept of departments.filter(d => d.parentId == parentId)) {
      const children = this.buildDeptTree(departments, dept.deptId); // 找到子节点
      console.log('buildDeptTree dept', dept);
      result.push({
        id: dept.deptId,
        label: dept.deptName,
        children: children.length > 0 ? children : null, // 如果没有子节点返回 null
      });
    }
    console.log('buildDeptTree result', result);
    return result;
  }
}
