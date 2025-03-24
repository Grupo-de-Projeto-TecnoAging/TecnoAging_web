import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosController } from './enderecos.controller';
import { EnderecosService } from './enderecos.service';

describe('EnderecosController', () => {
  let controller: EnderecosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecosController],
      providers: [EnderecosService],
    }).compile();

    controller = module.get<EnderecosController>(EnderecosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
