import { Test, TestingModule } from '@nestjs/testing';
import { PesquisadorService } from './pesquisador.service';

describe('PesquisadorService', () => {
  let service: PesquisadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PesquisadorService],
    }).compile();

    service = module.get<PesquisadorService>(PesquisadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
