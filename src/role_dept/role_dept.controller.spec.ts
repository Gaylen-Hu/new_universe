import { Test, TestingModule } from '@nestjs/testing';
import { RoleDeptController } from './role_dept.controller';
import { RoleDeptService } from './role_dept.service';

describe('RoleDeptController', () => {
  let controller: RoleDeptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleDeptController],
      providers: [RoleDeptService],
    }).compile();

    controller = module.get<RoleDeptController>(RoleDeptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
