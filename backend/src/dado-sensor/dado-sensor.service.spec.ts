import { Test, TestingModule } from '@nestjs/testing';
import { DadoSensorService } from './dado-sensor.service';

describe('DadoSensorService', () => {
  let service: DadoSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadoSensorService],
    }).compile();

    service = module.get<DadoSensorService>(DadoSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
