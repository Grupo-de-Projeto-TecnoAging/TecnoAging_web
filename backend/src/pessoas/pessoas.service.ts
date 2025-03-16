import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';
import { Profissional } from 'src/profissional/entities/profissional.entity';
import { CreateProfissionalDto } from 'src/profissional/dto/create-profissional.dto';
import { ProfissionalService } from 'src/profissional/profissional.service';
import { PesquisadorService } from 'src/pesquisador/pesquisador.service';
import { CreatePesquisadorDto } from 'src/pesquisador/dto/create-pesquisador.dto';
import { Pesquisador } from 'src/pesquisador/entities/pesquisador.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectModel(Pessoa)
    private readonly pessoaModel: typeof Pessoa,
    @InjectModel(Profissional)
    private readonly profissionalModel: typeof Profissional,
    @InjectModel(Pesquisador)
    private readonly pesquisadorModel: typeof Pesquisador,
    private readonly autenticacaoService: AutenticacaoService,
    private readonly profissionalService: ProfissionalService,
    private readonly pesquisadorService : PesquisadorService
  ) { }

  async create(
    createPessoaDto: Partial<CreatePessoaDto>, 
    createProfissionalDto?: Partial<CreateProfissionalDto>,
    createPesquisadorDto?: Partial<CreatePesquisadorDto>
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

    if (createPessoaDto.perfil === 'pesquisador') {
        if (!createPessoaDto.email || !createPessoaDto.instituicao || !createPessoaDto.area || !createPessoaDto.especialidade) {
            throw new BadRequestException('Dados de pesquisador são obrigatórios para este perfil: email, instituicao, area e especialidade');
        }
    }

    createPessoaDto.senha = await this.autenticacaoService.criptografarSenha(createPessoaDto.senha);

    const pessoa = await this.pessoaModel.create(createPessoaDto);

    if (pessoa.perfil === 'profissional') {
        await this.profissionalService.create(createPessoaDto as any, pessoa.cpf);
    }

    if (pessoa.perfil === 'pesquisador') {
      await this.pesquisadorService.create(createPessoaDto as any, pessoa.cpf);
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
