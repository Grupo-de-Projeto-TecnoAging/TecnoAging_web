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
    if (!createresearcherDto.email || 
      !createresearcherDto.institution || 
      !createresearcherDto.fieldOfStudy || 
      !createresearcherDto.expertise) {
      throw new BadRequestException('Email, instituition, field of suty and expertise are required for researcher profile.');
    }
    
    const researcher = await this.researcherModel.create({
      ...createresearcherDto,
      cpf:cpf 
    });
    
    return researcher;
  }

  async findAll(): Promise<Researcher[]> {
    return this.researcherModel.findAll();
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
