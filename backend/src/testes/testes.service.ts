import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';
import { Teste } from './entities/teste.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Profissional } from 'src/profissional/entities/profissional.entity';

@Injectable()
export class TestesService {
  constructor(
    @InjectModel(Teste)
    private readonly testesModel: typeof Teste,
  ) { }

  async create(createTestesDto: Partial<CreateTestesDto>): Promise<Teste> {
    return this.testesModel.create(createTestesDto);
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

  async findOneWithDetails(id: number): Promise<Teste> {
    const teste = await this.testesModel.findOne({
      where: { id },
      include: [
        { model: Paciente, attributes: ['nome', 'cpf', 'telefone', 'sexo', 'peso', 'altura'] },
        { model: Profissional, attributes: ['nome', 'cpf', 'telefone', 'email', 'especialidade'] }
      ],
    });
    if (!teste) {
      throw new NotFoundException('Teste não encontrado');
    }
    return teste;
  }


  update(id: number, updateTestesDto: UpdateTestesDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
