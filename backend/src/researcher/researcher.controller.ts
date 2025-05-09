import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';

@Controller('researcher')
export class ResearcherController {
  constructor(private readonly researcherService: ResearcherService) {}

  @Post()
  create(@Body() createresearcherDto: CreateResearcherDto, @Body('cpf') cpf: string) {
    return this.researcherService.create(createresearcherDto, cpf);
  }

  @Get()
  findAll() {
    return this.researcherService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.researcherService.findOne(cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updateResearcherDto: UpdateResearcherDto) {
    return this.researcherService.updateByCpf(cpf, updateResearcherDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.researcherService.removeByCpf(cpf);
  }
}
