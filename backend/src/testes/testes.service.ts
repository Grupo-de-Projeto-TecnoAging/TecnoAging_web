import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';
import { Teste } from './entities/teste.entity';
import { InjectModel } from '@nestjs/sequelize';

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

  update(id: number, updateTestesDto: UpdateTestesDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
