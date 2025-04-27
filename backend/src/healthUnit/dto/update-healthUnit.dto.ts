import { PartialType } from '@nestjs/mapped-types';
import { CreatehealthUnitDto } from './create-healthUnit.dto';

export class UpdatehealthUnitDto extends PartialType(CreatehealthUnitDto) {}
