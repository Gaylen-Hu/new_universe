import { Test, TestingModule } from '@nestjs/testing';
import { DictTypeController } from './dict_type.controller';
import { DictTypeService } from './dict_type.service';

describe('DictTypeController', () => {
  let controller: DictTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictTypeController],
      providers: [DictTypeService],
    }).compile();

    controller = module.get<DictTypeController>(DictTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
