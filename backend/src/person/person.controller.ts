import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('Person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto,) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.personService.findOne(cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.updateByCpf(cpf, updatePersonDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.personService.removeByCpf(cpf);
  }
}
