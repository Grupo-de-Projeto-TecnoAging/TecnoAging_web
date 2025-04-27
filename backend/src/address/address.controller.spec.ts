import { Test, TestingModule } from '@nestjs/testing';
import { AddresssController } from './address.controller';
import { AddresssService } from './address.service';

describe('AddresssController', () => {
  let controller: AddresssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddresssController],
      providers: [AddresssService],
    }).compile();

    controller = module.get<AddresssController>(AddresssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
