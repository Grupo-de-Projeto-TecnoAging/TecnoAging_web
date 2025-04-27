import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorDataService } from './sensorData.service';
import { CreateSensorDataDto } from './dto/create-sensorData.dto';
import { UpdateSensorDataDto } from './dto/update-sensorData.dto';

@Controller('dado-sensor')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  create(@Body() createSensorDataDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDataDto);
  }

  @Get()
  findAll() {
    return this.sensorDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorDataService.findOne(+id);
  }


  @Get('evaluation/:idEvaluation')
  findAllByTeste(@Param('idEvaluation') idEvaluation: string) {
    return this.sensorDataService.findAllByTeste(+idEvaluation);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDataDto: UpdateSensorDataDto) {
    return this.sensorDataService.update(+id, updateSensorDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDataService.remove(+id);
  }
}
