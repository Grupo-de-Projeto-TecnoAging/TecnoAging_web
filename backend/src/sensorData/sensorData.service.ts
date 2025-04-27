import { Injectable } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensorData.dto';
import { UpdateSensorDataDto } from './dto/update-sensorData.dto';
import { SensorData } from './entities/sensorData.entity';
import { InjectModel } from '@nestjs/sequelize';
import { HealthUnit } from 'src/healthUnit/entities/healthUnit.entity';

@Injectable()
export class SensorDataService {

constructor(
     @InjectModel(SensorData)
     private readonly sensorDataModel: typeof SensorData
    ) { }

  async create(createSensorDataDto: Partial<CreateSensorDataDto>): Promise<SensorData> {
    return await this.sensorDataModel.create(createSensorDataDto);
  }

  async findAll(): Promise<SensorData[]> {
    return await this.sensorDataModel.findAll();
  }


  async findAllByTeste(idEvaluation: number): Promise<SensorData[]> {
    return await this.sensorDataModel.findAll({
      where: { id_evaluation: idEvaluation },
      attributes: ['id_evaluation', 'time', 'accel_x', 'accel_y', 'accel_z', 'gyro_x', 'gyro_y', 'gyro_z'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} sensorData`;
  }

  update(id: number, updateSensorDataDto: UpdateSensorDataDto) {
    return `This action updates a #${id} sensorData`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensorData`;
  }
}
