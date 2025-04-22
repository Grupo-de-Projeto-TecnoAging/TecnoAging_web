import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';
import { Teste } from './entities/teste.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Paciente } from 'src/patient/entities/patient.entity';
import { Profissional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
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

  async findAllByPessoa(cpf: string): Promise<Teste[]> {
    return await this.testesModel.findAll({
      where: { cpfPessoa: cpf }
    });
  }
  async findOneByPessoa(cpf: string, id: number): Promise<Teste> {
    const teste = await this.testesModel.findOne({
      where: {
        cpfPessoa: cpf,
        id: id,
      },
    });
    if (!teste) {
      throw new NotFoundException('Teste não encontrado para esta pessoa');
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
          include: [{ model: Pessoa, attributes: ['nome', 'telefone', 'sexo'] }]
        },
        { 
          model: Profissional, 
          as: 'profissional',
          attributes:  ['email'] ,
          include: [{ model: Pessoa, attributes: ['nome', 'telefone'] }],
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
        nome: teste.paciente.pessoa.nome,
        telefone: teste.paciente.pessoa.telefone,
        sexo: teste.paciente.pessoa.sexo,
        peso: teste.paciente.peso,
        altura: teste.paciente.altura,
        data_nascimento: teste.paciente.data_nascimento
      },
      profissional: {
        nome: teste.profissional.pessoa.nome,
        email: teste.profissional.email,
        telefone: teste.profissional.pessoa.telefone
      }
    };
    delete result.paciente.pessoa;
    return result;
  }


  update(id: number, updateTestesDto: UpdateTestesDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
