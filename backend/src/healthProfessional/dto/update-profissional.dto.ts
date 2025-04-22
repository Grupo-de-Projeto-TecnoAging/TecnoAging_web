import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthProfessionalDto } from './create-healthProfessional.dto';

export class UpdateHealthProfessionalDto extends PartialType(CreateHealthProfessionalDto) {}
