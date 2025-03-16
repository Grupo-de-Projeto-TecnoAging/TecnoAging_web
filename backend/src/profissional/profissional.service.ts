import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profissional } from './entities/profissional.entity';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class ProfissionalService {
  constructor(
    @InjectModel(Profissional)
    private readonly profissionalModel: typeof Profissional,
  ) { }
  
  async create(createProfissionalDto: CreateProfissionalDto, cpf: string): Promise<Profissional> {
    
    if (!createProfissionalDto.email || !createProfissionalDto.especialidade) {
      throw new BadRequestException("Email e especialidade são obrigatórios para o perfil profissional.");
    }
     
    const profissional = await this.profissionalModel.create({
      ...createProfissionalDto,
      cpf: cpf, 
    });

    return profissional;
  }


  async findAll (): Promise<Profissional[]> {
    return await this.profissionalModel.findAll();
  }

  async findAllDetailed(): Promise<Profissional[]> {
    return await this.profissionalModel.findAll({
        include: [
            {
                model: Pessoa,  
                required: true,
            },
        ],
    });
}

  findOne(cpf: string) {
    const profissional = this.profissionalModel.findOne({
      where: { cpf },
    });
    if (!profissional) {
      throw new BadRequestException("Profissional não encontrado.");
    }
    return profissional;
  }

  update(id: number, updateProfissionalDto: UpdateProfissionalDto) {
    return `This action updates a #${id} profissional`;
  }

  remove(id: number) {
    return `This action removes a #${id} profissional`;
  }
}
