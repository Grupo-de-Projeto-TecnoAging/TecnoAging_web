import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from 'src/patient/entities/patient.entity';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { healthUnit } from 'src/healthUnit/entities/healthUnit.entity';
import { Person } from 'src/person/entities/person.entity';
import { SensorData } from 'src/sensorData/entities/sensorData.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(Evaluation)
    private readonly evaluationModel: typeof Evaluation,
  ) { }

  async create(createEvaluationDto: Partial<CreateEvaluationDto>): Promise<Evaluation> {
    const { sensorData, ...evaluationData } = createEvaluationDto;
  
    const createdEvaluation = await this.evaluationModel.create(
      {
        ...evaluationData,
        sensorData: sensorData || [], 
      },
      {
        include: [SensorData], 
      }
    );
  
    return createdEvaluation;
  }

  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationModel.findAll();
  }

  async findAllByPerson(cpf: string): Promise<Evaluation[]> {
    return await this.evaluationModel.findAll({
      where: { cpfPerson: cpf }
    });
  }
  async findOneByPerson(cpf: string, id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationModel.findOne({
      where: {
        cpfPerson: cpf,
        id: id,
      },
    });
    if (!evaluation) {
      throw new NotFoundException('Evaluation não encontrado para esta person');
    }
    return evaluation;
  }
  
  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationModel.findByPk(id);
    if (!evaluation) {
      throw new NotFoundException('Evaluation não encontrado');
    }
    return evaluation;
  }

  async findOneWithDetails(id: number): Promise<any> {
    const evaluation = await this.evaluationModel.findOne({
      where: { id },
      attributes: ['id', 'tipo', 'cpfPatient', 'cpfHealthProfessional', 'id_healthUnit', 'createdAt'],
      include: [
        { 
          model: Patient, 
          as: 'patient',
          attributes: ["weight", "height", "dateOfBirth"],
          include: [{ model: Person, attributes: ['name', 'phone', 'gender'] }]
        },
        { 
          model: HealthProfessional, 
          as: 'healthprofessional',
          attributes:  ['email'] ,
          include: [{ model: Person, attributes: ['name', 'phone'] }],
        },
        { model: healthUnit, as: 'healthUnit', attributes: ['name', 'id_address'] },
      ],
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation não encontrado');
    }
    const result = {
      ...evaluation.toJSON(), // Converte o objeto Sequelize para JSON puro
      patient: {
        name: evaluation.patient.person.name,
        phone: evaluation.patient.person.phone,
        gender: evaluation.patient.person.gender,
        weight: evaluation.patient.weight,
        height: evaluation.patient.height,
        dateOfBirth: evaluation.patient.dateOfBirth
      },
      healthprofessional: {
        name: evaluation.healthprofessional.person.name,
        email: evaluation.healthprofessional.email,
        phone: evaluation.healthprofessional.person.phone
      }
    };
    delete result.patient.person;
    return result;
  }


  update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
