import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) { }

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.pessoasService.findOne(+cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.updateByCpf(+cpf, updatePessoaDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: number) {
    return this.pessoasService.removeByCpf(cpf);
  }
}
