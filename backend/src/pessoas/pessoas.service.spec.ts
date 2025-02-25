import { Test, TestingModule } from '@nestjs/testing';
import { PessoasService } from './pessoas.service';

describe('PessoasService', () => {
  let service: PessoasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasService],
    }).compile();

    service = module.get<PessoasService>(PessoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
