import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';
import { Especialidade, Profissional } from 'src/profissional/entities/profissional.entity';
import { CreateProfissionalDto } from 'src/profissional/dto/create-profissional.dto';
import { ProfissionalService } from 'src/profissional/profissional.service';

@Injectable()
export class PessoasService {
  profissionalRepository: any;
  constructor(
    @InjectModel(Pessoa)
    private readonly pessoaModel: typeof Pessoa,
    @InjectModel(Profissional)
    private readonly profissionalModel: typeof Profissional,
    private readonly autenticacaoService: AutenticacaoService,
    private readonly profissionalService: ProfissionalService,
  ) { }

  async create(
    createPessoaDto: Partial<CreatePessoaDto>, 
    createProfissionalDto?: Partial<CreateProfissionalDto> // Adicionando como opcional
): Promise<Pessoa> {

    if (!createPessoaDto.senha) {
        throw new BadRequestException('Senha é obrigatória');
    }

    if (!createPessoaDto.cpf || !createPessoaDto.perfil) {
        throw new BadRequestException('CPF e Perfil são obrigatórios');
    }

    if (createPessoaDto.perfil === 'profissional') {
        if (!createPessoaDto.email || !createPessoaDto.especialidade) {
            throw new BadRequestException('Dados de profissional são obrigatórios para este perfil: email e especialidade');
        }
    }

    createPessoaDto.senha = await this.autenticacaoService.criptografarSenha(createPessoaDto.senha);

    const pessoa = await this.pessoaModel.create(createPessoaDto);

    if (pessoa.perfil === 'profissional') {
        await this.profissionalService.create(createPessoaDto as any, pessoa.cpf);
    }
    return pessoa;
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
