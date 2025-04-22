import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto,) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.peopleService.findOne(cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.updateByCpf(cpf, updatePersonDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.peopleService.removeByCpf(cpf);
  }
}
