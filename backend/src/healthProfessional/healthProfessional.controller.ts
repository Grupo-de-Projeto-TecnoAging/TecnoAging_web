import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthProfessionalService } from './healthProfessional.service';
import { CreateHealthProfessionalDto } from './dto/create-healthProfessional.dto';
import { UpdateHealthProfessionalDto } from './dto/update-healthProfessional.dto';

@Controller('healthProfessional')
export class HealthProfessionalController {
  constructor(private readonly HealthProfessionalService: HealthProfessionalService) {}

  @Post()
  create(@Body() createHealthProfessionalDto: CreateHealthProfessionalDto) {
    const cpf  = createHealthProfessionalDto.cpf;
    return this.HealthProfessionalService.create(createHealthProfessionalDto, cpf);
  }

  @Get()
  findAll() {
    return this.HealthProfessionalService.findAll();
  }

  @Get('detailed')
  findAllDetailed() {
    return this.HealthProfessionalService.findAllDetailed();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.HealthProfessionalService.findOne(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthProfessionalDto: UpdateHealthProfessionalDto) {
    return this.HealthProfessionalService.update(+id, updateHealthProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.HealthProfessionalService.remove(+id);
  }
}
