import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePesquisadorDto } from './dto/create-pesquisador.dto';
import { UpdatePesquisadorDto } from './dto/update-pesquisador.dto';
import { Pesquisador } from './entities/pesquisador.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PesquisadorService {

  constructor(
    @InjectModel(Pesquisador)
    private readonly pesquisadorModel: typeof Pesquisador
  ) { }

  async create(createPesquisadorDto: CreatePesquisadorDto, cpf: string): Promise<Pesquisador> {  
    if (!createPesquisadorDto.email || !createPesquisadorDto.instituicao || !createPesquisadorDto.area || !createPesquisadorDto.especialidade) {
      throw new BadRequestException('Email, instituicao, area e especialidade são obrigatórios para o perfil de pesquisador.');
    }
    
    const pesquisador = await this.pesquisadorModel.create({
      ...createPesquisadorDto,
      cpf:cpf 
    });
    
    return pesquisador;
  }

  findAll() {
    return `This action returns all pesquisador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pesquisador`;
  }

  update(id: number, updatePesquisadorDto: UpdatePesquisadorDto) {
    return `This action updates a #${id} pesquisador`;
  }

  remove(id: number) {
    return `This action removes a #${id} pesquisador`;
  }
}
