import { Test, TestingModule } from '@nestjs/testing';
import { TestesService } from './testes.service';

describe('TestesService', () => {
  let service: TestesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestesService],
    }).compile();

    service = module.get<TestesService>(TestesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
