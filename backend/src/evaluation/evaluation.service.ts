import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from 'src/patient/entities/patient.entity';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { HealthUnit } from 'src/healthUnit/entities/healthUnit.entity';
import { Person } from 'src/person/entities/person.entity';
import { SensorData } from 'src/sensorData/entities/sensorData.entity';
import { Op } from 'sequelize';


const evaluationDetailsInclude = [
    {
        model: Patient,
        as: 'patient',
        attributes: ['weight', 'height', 'dateOfBirth'],
        include: [{ model: Person, as: 'person', attributes: ['name', 'phone', 'gender'] }],
    },
    {
        model: HealthProfessional,
        as: 'healthProfessional',
        attributes: ['email'],
        include: [{ model: Person, as: 'person', attributes: ['name', 'phone'] }],
    },
    { model: HealthUnit, as: 'healthUnit', attributes: ['name'] },
    { model: SensorData, as: 'sensorData' },
];

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(Evaluation)
    private readonly evaluationModel: typeof Evaluation,
  ) { }

  private formatEvaluationDetails(evaluation: Evaluation): any {
        if (!evaluation) {
            return null;
        }

        const evaluationJson = evaluation.toJSON();

        const formattedResult = {
            ...evaluationJson,

            patient: evaluationJson.patient ? {
                name: evaluationJson.patient.person?.name,
                phone: evaluationJson.patient.person?.phone,
                gender: evaluationJson.patient.person?.gender,
                weight: evaluationJson.patient.weight,
                height: evaluationJson.patient.height,
                dateOfBirth: evaluationJson.patient.dateOfBirth,
            } : null,

            healthProfessional: evaluationJson.healthProfessional ? {
                name: evaluationJson.healthProfessional.person?.name,
                email: evaluationJson.healthProfessional.email,
                phone: evaluationJson.healthProfessional.person?.phone,
            } : null,
        };

        return formattedResult;
    }

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

    return this.findOne(createdEvaluation.id);
  }

  async findAll(): Promise<Evaluation[]> {
    const evaluations = await this.evaluationModel.findAll({
            include: evaluationDetailsInclude,
            order: [['date', 'DESC']],
        });
        return evaluations.map(evaluation => this.formatEvaluationDetails(evaluation));
    }

  async findAllByPerson(cpf: string): Promise<Evaluation[]> {
    const evaluations = await this.evaluationModel.findAll({
      where: {
        [Op.or]: [
            { cpfHealthProfessional: cpf },
            { cpfPatient: cpf },
        ],
    },
    include: evaluationDetailsInclude,
    order: [['date', 'DESC']],
    });
    return evaluations.map(evaluation => this.formatEvaluationDetails(evaluation));
  }
  
  async findOneByPerson(cpf: string, id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationModel.findOne({
      where: {
        [Op.or]: [
          { cpfHealthProfessional: cpf },
          { cpfPatient: cpf },
        ],
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
      attributes: [
        'id',
        'type',
        'cpfPatient',
        'cpfHealthProfessional',
        'date',
        'totalTime',
        'id_healthUnit',
        'createdAt'
      ],
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ["weight", "height", "dateOfBirth"],
          include: [{ model: Person, attributes: ['name', 'phone', 'gender'] }]
        },
        {
          model: HealthProfessional,
          as: 'healthProfessional',
          attributes: ['email'],
          include: [{ model: Person, attributes: ['name', 'phone'] }],
        },
        { model: HealthUnit, as: 'healthUnit', attributes: ['name'] },
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
      healthProfessional: {
        name: evaluation.healthProfessional.person.name,
        email: evaluation.healthProfessional.email,
        phone: evaluation.healthProfessional.person.phone
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
