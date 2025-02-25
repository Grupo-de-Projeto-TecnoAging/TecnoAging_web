import { Test, TestingModule } from '@nestjs/testing';
import { TestesController } from './testes.controller';
import { TestesService } from './testes.service';

describe('TestesController', () => {
  let controller: TestesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestesController],
      providers: [TestesService],
    }).compile();

    controller = module.get<TestesController>(TestesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
