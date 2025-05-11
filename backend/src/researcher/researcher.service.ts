import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { Researcher } from './entities/researcher.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ReturnResearcherDto } from './dto/return-researcher.dto';
import { Transaction } from 'sequelize';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class ResearcherService {
  constructor(
    @InjectModel(Researcher)
    private readonly researcherModel: typeof Researcher
  ) { }

  async create(createresearcherDto: CreateResearcherDto, cpf: string, transaction?: Transaction): Promise<Researcher> {  
    if (!createresearcherDto.email || 
      !createresearcherDto.institution || 
      !createresearcherDto.fieldOfStudy || 
      !createresearcherDto.expertise) {
      throw new BadRequestException('Email, instituition, field of suty and expertise are required for researcher profile.');
    }
    
    const researcher = await this.researcherModel.create({
      ...createresearcherDto,
      cpf:cpf,
     }, {
          transaction,
        });
    
    return researcher;
  }

  async findAll(): Promise<ReturnResearcherDto[]> {
    const researcher = await this.researcherModel.findAll({
      include: [{ model: Person, attributes: ['name'] }],
    });

    return researcher.map(researcher => ({
      name: researcher.person?.name,
      cpf: researcher.cpf,
      email: researcher.email,
      institution: researcher.institution,
      fieldOfStudy: researcher.fieldOfStudy,
      expertise: researcher.expertise,
    }));
  }

  async findOne(cpf: string): Promise<ReturnResearcherDto> {
    const researcher = await this.researcherModel.findByPk(cpf, { include: [{ model: Person, attributes: ['name'] }] });
    if (!researcher) {
      throw new BadRequestException('researcher not found.');
    }
    return {
      name: researcher.person?.name,
      cpf: researcher.cpf,
      email: researcher.email,
      institution: researcher.institution,
      fieldOfStudy: researcher.fieldOfStudy,
      expertise: researcher.expertise
    };
  }

  async updateByCpf(cpf: string, updateResearcherDto: UpdateResearcherDto) {
    const researcher = await this.researcherModel.findOne({ where: { cpf } });
    if (!researcher) {
      throw new BadRequestException('researcher not found.');
    }

    await researcher.update(updateResearcherDto);
    return researcher;
  }

  async removeByCpf(cpf: string) {
    const researcher = await this.researcherModel.findOne({ where: { cpf } });
    if (!researcher) {
      throw new BadRequestException('researcher not found.');
    }

    await researcher.destroy();
    return researcher;
  }
}
