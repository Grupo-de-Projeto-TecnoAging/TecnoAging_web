import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Body('cpf') cpf: string) {
    return this.patientsService.create(createPatientDto, cpf);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.patientsService.findOne(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.updateById(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.removeById(id);
  }
}
