import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Body('cpf') cpf: string) {
    return this.patientService.create(createPatientDto, cpf);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.patientService.findOne(cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updateByCpf(cpf, updatePatientDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.patientService.removeByCpf(cpf);
  }
}
