import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PesquisadorService } from './pesquisador.service';
import { CreatePesquisadorDto } from './dto/create-pesquisador.dto';
import { UpdatePesquisadorDto } from './dto/update-pesquisador.dto';

@Controller('pesquisador')
export class PesquisadorController {
  constructor(private readonly pesquisadorService: PesquisadorService) {}

  @Post()
  create(@Body() createPesquisadorDto: CreatePesquisadorDto) {
    return this.pesquisadorService.create(createPesquisadorDto);
  }

  @Get()
  findAll() {
    return this.pesquisadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pesquisadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePesquisadorDto: UpdatePesquisadorDto) {
    return this.pesquisadorService.update(+id, updatePesquisadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pesquisadorService.remove(+id);
  }
}
