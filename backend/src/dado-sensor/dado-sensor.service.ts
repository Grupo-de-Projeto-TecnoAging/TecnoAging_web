import { Injectable } from '@nestjs/common';
import { CreateDadoSensorDto } from './dto/create-dado-sensor.dto';
import { UpdateDadoSensorDto } from './dto/update-dado-sensor.dto';
import { DadoSensor } from './entities/dado-sensor.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Teste } from 'src/testes/entities/teste.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Injectable()
export class DadoSensorService {

constructor(
     @InjectModel(DadoSensor)
     private readonly dadoSensorModel: typeof DadoSensor
    ) { }

  async create(createDadoSensorDto: Partial<CreateDadoSensorDto>): Promise<DadoSensor> {
    return this.dadoSensorModel.create(createDadoSensorDto);
  }

  async findAll(): Promise<DadoSensor[]> {
    return await this.dadoSensorModel.findAll();
  }


  async findAllByTeste(idTeste: number): Promise<DadoSensor[]> {
    return await this.dadoSensorModel.findAll({
      where: { id_teste: idTeste },
      attributes: ['id_teste', 'tempo', 'accel_x', 'accel_y', 'accel_z', 'gyro_x', 'gyro_y', 'gyro_z'],
      include: [
        {model: Teste, as: 'teste', attributes: ['tipo', 'cpfPaciente', 'cpfProfissional', 'id_unidade'], include: [
          { model: Unidade,  attributes: ['nome'] }]
        }
      ],
    });
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
