import { Test, TestingModule } from '@nestjs/testing';
import { AddresssService } from './address.service';

describe('AddresssService', () => {
  let service: AddresssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddresssService],
    }).compile();

    service = module.get<AddresssService>(AddresssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
