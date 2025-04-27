import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDataDto } from './create-sensorData.dto';

export class UpdateSensorDataDto extends PartialType(CreateSensorDataDto) {}
