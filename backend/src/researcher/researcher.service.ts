import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Researcher> {
    const researcher = await this.researcherModel.findByPk(id);
    if (!researcher) {
      throw new NotFoundException(`Researcher with id ${id} not found`);
    }
    return researcher;
  }

  async updateById(id: number, updateresearcherDto: UpdateResearcherDto): Promise<Researcher> {
    const researcher = await this.researcherModel.findOne({ where: { id } });
    if (!researcher) {
      throw new NotFoundException(`Researcher with id ${id} not found`);
    }
    if (!updateresearcherDto.email ||
      !updateresearcherDto.institution ||
      !updateresearcherDto.fieldOfStudy ||
      !updateresearcherDto.expertise) {
      throw new BadRequestException('Email, instituition, field of suty and expertise are required for researcher profile.');
    }
    await researcher.update(updateresearcherDto);
    return researcher;
  }
  async removeById(id: number): Promise<Researcher> {
    const researcher = await this.researcherModel.findOne({ where: { id } });
    if (!researcher) {
      throw new NotFoundException(`Researcher with id ${id} not found`);
    }
    await researcher.destroy();
    return researcher;
  }
}
