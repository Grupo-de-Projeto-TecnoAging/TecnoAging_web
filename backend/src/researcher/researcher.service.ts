import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { Researcher } from './entities/researcher.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ResearcherService {

  constructor(
    @InjectModel(Researcher)
    private readonly researcherModel: typeof Researcher
  ) { }

  async create(createresearcherDto: UpdateResearcherDto, cpf: string): Promise<Researcher> {  
    if (!createresearcherDto.email || !createresearcherDto.institution || !createresearcherDto.fieldOfStudy || !createresearcherDto.expertise) {
      throw new BadRequestException('Email, instituicao, area e especialidade são obrigatórios para o perfil de researcher.');
    }
    
    const researcher = await this.researcherModel.create({
      ...createresearcherDto,
      cpf:cpf 
    });
    
    return researcher;
  }

  findAll() {
    return `This action returns all researcher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} researcher`;
  }

  update(id: number, updateresearcherDto: UpdateResearcherDto) {
    return `This action updates a #${id} researcher`;
  }

  remove(id: number) {
    return `This action removes a #${id} researcher`;
  }
}
