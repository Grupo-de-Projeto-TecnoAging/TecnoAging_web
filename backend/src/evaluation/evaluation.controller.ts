import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(+id);
  }

  @Get('person/:cpf')
  findAllByPerson(@Param('cpf') cpf: string) {
    return this.evaluationService.findAllByPerson(cpf);
  }

  @Get('person/:cpf/:id')
  findOneByPerson(@Param('cpf') cpf: string, @Param('id') id: string) {
    return this.evaluationService.findOneByPerson(cpf, +id);
  }

  @Get('details/:id')
  findOneWithDetails(@Param('id') id: string) {
    return this.evaluationService.findOneWithDetails(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
