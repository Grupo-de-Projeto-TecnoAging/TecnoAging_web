import { Module } from '@nestjs/common';
import { DadoSensorService } from './dado-sensor.service';
import { DadoSensorController } from './dado-sensor.controller';
import { DadoSensor } from './entities/dado-sensor.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([DadoSensor])],
  controllers: [DadoSensorController],
  providers: [DadoSensorService],
})
export class DadoSensorModule {}
