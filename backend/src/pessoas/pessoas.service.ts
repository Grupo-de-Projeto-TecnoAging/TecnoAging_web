import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectModel(Pessoa)
    private readonly pessoaModel: typeof Pessoa,
    private readonly autenticacaoService: AutenticacaoService,
  ) { }

  async create(createPessoaDto: Partial<CreatePessoaDto>): Promise<Pessoa> {
    if(!createPessoaDto.senha) {
      throw new Error('Senha é obrigatória');
    }
    
    createPessoaDto.senha = await this.autenticacaoService.criptografarSenha(createPessoaDto.senha);
    return await this.pessoaModel.create(createPessoaDto);
  }

  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaModel.findAll();
  }

  async findOne(cpf: string): Promise<Pessoa> {
    const pessoa = await this.pessoaModel.findOne({ where: { cpf } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com cpf ${cpf} não encontrada`);
    }
    return pessoa;
  }

  async updateByCpf(cpf: string, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.pessoaModel.findOne({ where: { cpf } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com cpf ${cpf} não encontrada`);
    }
    await pessoa.update(updatePessoaDto);
    return pessoa;
  }

  async removeByCpf(cpf: string): Promise<Pessoa> {
    const pessoa = await this.pessoaModel.findOne({ where: { cpf } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com cpf ${cpf} não encontrada`);
    }

    await pessoa.destroy();
    return pessoa;
  }
}
