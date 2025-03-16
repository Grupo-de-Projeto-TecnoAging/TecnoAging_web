import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DadoSensorService } from './dado-sensor.service';
import { CreateDadoSensorDto } from './dto/create-dado-sensor.dto';
import { UpdateDadoSensorDto } from './dto/update-dado-sensor.dto';

@Controller('dado-sensor')
export class DadoSensorController {
  constructor(private readonly dadoSensorService: DadoSensorService) {}

  @Post()
  create(@Body() createDadoSensorDto: CreateDadoSensorDto) {
    return this.dadoSensorService.create(createDadoSensorDto);
  }

  @Get()
  findAll() {
    return this.dadoSensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dadoSensorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDadoSensorDto: UpdateDadoSensorDto) {
    return this.dadoSensorService.update(+id, updateDadoSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dadoSensorService.remove(+id);
  }
}
