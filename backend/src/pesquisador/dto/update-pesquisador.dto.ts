import { PartialType } from '@nestjs/mapped-types';
import { CreatePesquisadorDto } from './create-pesquisador.dto';

export class UpdatePesquisadorDto extends PartialType(CreatePesquisadorDto) {}
