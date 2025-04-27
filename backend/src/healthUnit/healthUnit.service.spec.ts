import { Test, TestingModule } from '@nestjs/testing';
import { healthUnitService } from './healthUnit.service';

describe('healthUnitService', () => {
  let service: healthUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [healthUnitService],
    }).compile();

    service = module.get<healthUnitService>(healthUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
