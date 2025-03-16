import { Injectable } from '@nestjs/common';
import { CreateDadoSensorDto } from './dto/create-dado-sensor.dto';
import { UpdateDadoSensorDto } from './dto/update-dado-sensor.dto';

@Injectable()
export class DadoSensorService {
  create(createDadoSensorDto: CreateDadoSensorDto) {
    return 'This action adds a new dadoSensor';
  }

  findAll() {
    return `This action returns all dadoSensor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dadoSensor`;
  }

  update(id: number, updateDadoSensorDto: UpdateDadoSensorDto) {
    return `This action updates a #${id} dadoSensor`;
  }

  remove(id: number) {
    return `This action removes a #${id} dadoSensor`;
  }
}
