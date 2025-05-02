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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researcherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateresearcherDto: UpdateResearcherDto) {
    return this.researcherService.updateById(+id, updateresearcherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researcherService.removeById(+id);
  }
}
