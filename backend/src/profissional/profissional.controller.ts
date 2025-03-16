import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

@Controller('profissional')
export class ProfissionalController {
  constructor(private readonly profissionalService: ProfissionalService) {}

  @Post()
  create(@Body() createProfissionalDto: CreateProfissionalDto, @Body('cpf') cpf: string) {
    return this.profissionalService.create(createProfissionalDto, cpf);
  }

  @Get()
  findAll() {
    return this.profissionalService.findAll();
  }

  @Get('detailed')
  findAllDetailed() {
    return this.profissionalService.findAllDetailed();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.profissionalService.findOne(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfissionalDto: UpdateProfissionalDto) {
    return this.profissionalService.update(+id, updateProfissionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionalService.remove(+id);
  }
}
