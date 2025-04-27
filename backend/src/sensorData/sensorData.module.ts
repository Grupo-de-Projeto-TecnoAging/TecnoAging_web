import { Module } from '@nestjs/common';
import { SensorDataService } from './sensorData.service';
import { SensorDataController } from './sensorData.controller';
import { SensorData } from './entities/sensorData.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([SensorData])],
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorDataModule {}
