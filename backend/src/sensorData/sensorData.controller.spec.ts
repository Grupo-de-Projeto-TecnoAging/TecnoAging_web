import { Test, TestingModule } from '@nestjs/testing';
import { SensorDataController } from './sensorData.controller';
import { SensorDataService } from './sensorData.service';

describe('SensorDataController', () => {
  let controller: SensorDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorDataController],
      providers: [SensorDataService],
    }).compile();

    controller = module.get<SensorDataController>(SensorDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
