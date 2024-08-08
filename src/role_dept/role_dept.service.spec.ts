import { Test, TestingModule } from '@nestjs/testing';
import { RoleDeptService } from './role_dept.service';

describe('RoleDeptService', () => {
  let service: RoleDeptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleDeptService],
    }).compile();

    service = module.get<RoleDeptService>(RoleDeptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
