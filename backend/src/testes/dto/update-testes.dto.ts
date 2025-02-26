import { PartialType } from '@nestjs/mapped-types';
import { CreateTestesDto } from './create-testes.dto';

export class UpdateTestesDto extends PartialType(CreateTestesDto) {}
