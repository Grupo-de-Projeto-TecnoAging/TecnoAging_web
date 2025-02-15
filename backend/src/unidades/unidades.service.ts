import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectModel(Unidade)
    private readonly unidadeModel: typeof Unidade,
  ) { }

  async create(createUnidadeDto: Partial<CreateUnidadeDto>): Promise<Unidade> {
    return this.unidadeModel.create(createUnidadeDto);
  }

  async findAll(): Promise<Unidade[]> {
    return this.unidadeModel.findAll();
  }

  async findOne(id: number): Promise<Unidade> {
    const unidade = await this.unidadeModel.findByPk(id);
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada`);
    }
    return unidade;
  }

  async updateById(id: string, updateUnidadeDto: UpdateUnidadeDto): Promise<Unidade> {
    const unidade = await this.unidadeModel.findOne({ where: { id } });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada`);
    }

    await unidade.update(updateUnidadeDto);
    return unidade;
  }

  async removeById(id: string): Promise<Unidade> {
    const unidade = await this.unidadeModel.findOne({ where: { id } });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada`);
    }

    await unidade.destroy();
    return unidade;
  }
}
