import { PartialType } from '@nestjs/mapped-types';
import { CreateDadoSensorDto } from './create-dado-sensor.dto';

export class UpdateDadoSensorDto extends PartialType(CreateDadoSensorDto) {}
