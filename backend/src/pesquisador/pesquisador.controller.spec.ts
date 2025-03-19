import { Test, TestingModule } from '@nestjs/testing';
import { PesquisadorController } from './pesquisador.controller';
import { PesquisadorService } from './pesquisador.service';

describe('PesquisadorController', () => {
  let controller: PesquisadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesquisadorController],
      providers: [PesquisadorService],
    }).compile();

    controller = module.get<PesquisadorController>(PesquisadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
