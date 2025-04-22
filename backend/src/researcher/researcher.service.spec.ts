import { Test, TestingModule } from '@nestjs/testing';
import { ResearcherService } from './researcher.service';

describe('ResearcherService', () => {
  let service: ResearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearcherService],
    }).compile();

    service = module.get<ResearcherService>(ResearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
