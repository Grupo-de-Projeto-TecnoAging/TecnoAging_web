import { Test, TestingModule } from '@nestjs/testing';
import { DadoSensorController } from './dado-sensor.controller';
import { DadoSensorService } from './dado-sensor.service';

describe('DadoSensorController', () => {
  let controller: DadoSensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadoSensorController],
      providers: [DadoSensorService],
    }).compile();

    controller = module.get<DadoSensorController>(DadoSensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
