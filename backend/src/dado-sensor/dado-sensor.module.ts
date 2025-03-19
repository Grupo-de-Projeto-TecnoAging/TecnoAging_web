import { Module } from '@nestjs/common';
import { DadoSensorService } from './dado-sensor.service';
import { DadoSensorController } from './dado-sensor.controller';

@Module({
  controllers: [DadoSensorController],
  providers: [DadoSensorService],
})
export class DadoSensorModule {}
