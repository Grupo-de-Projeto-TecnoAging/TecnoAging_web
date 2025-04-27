import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';
import { Teste } from './entities/teste.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Paciente } from 'src/patient/entities/patient.entity';
import { Profissional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';
import { Person } from 'src/persons/entities/person.entity';
import { DadoSensor } from 'src/dado-sensor/entities/dado-sensor.entity';

@Injectable()
export class TestesService {
  constructor(
    @InjectModel(Teste)
    private readonly testesModel: typeof Teste,
  ) { }

  async create(createTestesDto: Partial<CreateTestesDto>): Promise<Teste> {
    const { dadosSensor, ...dadosTeste } = createTestesDto;
  
    const testeCriado = await this.testesModel.create(
      {
        ...dadosTeste,
        dadosSensor: dadosSensor || [], 
      },
      {
        include: [DadoSensor], 
      }
    );
  
    return testeCriado;
  }

  async findAll(): Promise<Teste[]> {
    return await this.testesModel.findAll();
  }

  async findAllByPerson(cpf: string): Promise<Teste[]> {
    return await this.testesModel.findAll({
      where: { cpfPerson: cpf }
    });
  }
  async findOneByPerson(cpf: string, id: number): Promise<Teste> {
    const teste = await this.testesModel.findOne({
      where: {
        cpfPerson: cpf,
        id: id,
      },
    });
    if (!teste) {
      throw new NotFoundException('Teste não encontrado para esta person');
    }
    return teste;
  }
  
  async findOne(id: number): Promise<Teste> {
    const teste = await this.testesModel.findByPk(id);
    if (!teste) {
      throw new NotFoundException('Teste não encontrado');
    }
    return teste;
  }

  async findOneWithDetails(id: number): Promise<any> {
    const teste = await this.testesModel.findOne({
      where: { id },
      attributes: ['id', 'tipo', 'cpfPaciente', 'cpfProfissional', 'id_unidade', 'createdAt'],
      include: [
        { 
          model: Paciente, 
          as: 'paciente',
          attributes: ["peso", "altura", "data_nascimento"],
          include: [{ model: Person, attributes: ['nome', 'telefone', 'sexo'] }]
        },
        { 
          model: Profissional, 
          as: 'profissional',
          attributes:  ['email'] ,
          include: [{ model: Person, attributes: ['nome', 'telefone'] }],
        },
        { model: Unidade, as: 'unidade', attributes: ['nome', 'id_endereco'] },
      ],
    });

    if (!teste) {
      throw new NotFoundException('Teste não encontrado');
    }
    const result = {
      ...teste.toJSON(), // Converte o objeto Sequelize para JSON puro
      paciente: {
        nome: teste.paciente.person.nome,
        telefone: teste.paciente.person.telefone,
        sexo: teste.paciente.person.sexo,
        peso: teste.paciente.peso,
        altura: teste.paciente.altura,
        data_nascimento: teste.paciente.data_nascimento
      },
      profissional: {
        nome: teste.profissional.person.nome,
        email: teste.profissional.email,
        telefone: teste.profissional.person.telefone
      }
    };
    delete result.paciente.person;
    return result;
  }


  update(id: number, updateTestesDto: UpdateTestesDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
