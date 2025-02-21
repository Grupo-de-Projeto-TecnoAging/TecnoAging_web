import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PessoasService {
  constructor(
    @InjectModel(Pessoa)
    private readonly pessoaModel: typeof Pessoa,
  ) { }

  async create(createPessoaDto: Partial<CreatePessoaDto>): Promise<Pessoa> {
    return await this.pessoaModel.create(createPessoaDto);
  }

  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaModel.findAll();
  }

  findOne(cpf: number) {
    return `This action returns a #${cpf} pessoa`;
  }

  async updateByCpf(cpf: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.pessoaModel.findOne({ where: { cpf } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com cpf ${cpf} não encontrada`);
    }
    await pessoa.update(updatePessoaDto);
    return pessoa;
  }

  async removeByCpf(cpf: number): Promise<Pessoa> {
    const pessoa = await this.pessoaModel.findOne({ where: { cpf } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com cpf ${cpf} não encontrada`);
    }

    await pessoa.destroy();
    return pessoa;
  }
}
