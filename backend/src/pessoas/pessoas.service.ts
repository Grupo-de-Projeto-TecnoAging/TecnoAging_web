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
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { CreatePacienteDto } from 'src/pacientes/dto/create-paciente.dto';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { EnderecosService } from 'src/enderecos/enderecos.service';
import { Endereco } from 'src/enderecos/entities/endereco.entity';
import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectModel(Pessoa)
    private readonly pessoaModel: typeof Pessoa,
    @InjectModel(Profissional)
    private readonly profissionalModel: typeof Profissional,
    @InjectModel(Pesquisador)
    private readonly pesquisadorModel: typeof Pesquisador,
    @InjectModel(Paciente)
    private readonly pacienteModel: typeof Paciente,
    private readonly autenticacaoService: AutenticacaoService,
    private readonly profissionalService: ProfissionalService,
    private readonly pesquisadorService: PesquisadorService,
    private readonly pacientesService: PacientesService,
    private readonly enderecosService: EnderecosService,
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,
  ) { }

  async create(
    createPessoaDto: Partial<CreatePessoaDto>,
    createProfissionalDto?: Partial<CreateProfissionalDto>,
    createPesquisadorDto?: Partial<CreatePesquisadorDto>,
    createPacienteDto?: Partial<CreatePacienteDto>,
    createEnderecoDto?: Partial<CreateEnderecoDto>,
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

    if (createPessoaDto.perfil === 'paciente') {
      if (!createPessoaDto.data_nascimento || !createPessoaDto.escolaridade || !createPessoaDto.nivel_socio_economico || !createPessoaDto.peso || !createPessoaDto.altura) {
        throw new BadRequestException('Dados de paciente são obrigatórios para este perfil: data_nascimento, escolaridade, nivel_socio_economico, peso e altura');
      }
      if (!createEnderecoDto || !createEnderecoDto.endereco_cep || !createEnderecoDto.numero || !createEnderecoDto.rua || !createEnderecoDto.complemento || !createEnderecoDto.bairro || !createEnderecoDto.cidade || !createEnderecoDto.estado) {
        throw new BadRequestException('Todos os dados do endereço são obrigatórios');
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

    if (pessoa.perfil === 'paciente') {
     
      const enderecoCriado = await this.enderecosService.create(createEnderecoDto as any);
      if (!enderecoCriado) {
        throw new BadRequestException('Erro ao criar o endereço');
      }
      createPessoaDto.id_endereco = enderecoCriado.endereco_cep;

      await this.pacientesService.create(createPessoaDto as any, pessoa.cpf);
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
