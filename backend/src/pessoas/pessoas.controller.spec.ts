import { Test, TestingModule } from '@nestjs/testing';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';

describe('PessoasController', () => {
  let controller: PessoasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasController],
      providers: [PessoasService],
    }).compile();

    controller = module.get<PessoasController>(PessoasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
