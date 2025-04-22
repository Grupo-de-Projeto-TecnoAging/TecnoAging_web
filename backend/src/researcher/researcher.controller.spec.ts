import { Test, TestingModule } from '@nestjs/testing';
import { ResearcherController } from './researcher.controller';
import { ResearcherService } from './researcher.service';

describe('ResearcherController', () => {
  let controller: ResearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearcherController],
      providers: [ResearcherService],
    }).compile();

    controller = module.get<ResearcherController>(ResearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
