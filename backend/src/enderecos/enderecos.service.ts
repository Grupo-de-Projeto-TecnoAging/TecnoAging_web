import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,
  ) { }

  async create(createEnderecoDto: Partial<CreateEnderecoDto>): Promise<Endereco> {
    return this.enderecoModel.create(createEnderecoDto);
  }

  async findAll(): Promise<Endereco[]> {
    return this.enderecoModel.findAll();
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoModel.findByPk(id);
    if (!endereco) {
      throw new NotFoundException(`Endereco com id ${id} não encontrada`);
    }
    return endereco;
  }

  async updateById(id: string, updateEnderecoDto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.enderecoModel.findOne({ where: { id } });
    if (!endereco) {
      throw new NotFoundException(`endereco com id ${id} não encontrada`);
    }

    await endereco.update(updateEnderecoDto);
    return endereco;
  }

  async removeById(id: string): Promise<Endereco> {
    const endereco = await this.enderecoModel.findOne({ where: { id } });
    if (!endereco) {
      throw new NotFoundException(`Endereco com id ${id} não encontrada`);
    }

    await endereco.destroy();
    return endereco;
  }
}
