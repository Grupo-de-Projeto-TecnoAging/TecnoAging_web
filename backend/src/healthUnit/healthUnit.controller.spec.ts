import { Test, TestingModule } from '@nestjs/testing';
import { healthUnitController } from './healthUnit.controller';
import { healthUnitService } from './healthUnit.service';

describe('healthUnitController', () => {
  let controller: healthUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [healthUnitController],
      providers: [healthUnitService],
    }).compile();

    controller = module.get<healthUnitController>(healthUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
