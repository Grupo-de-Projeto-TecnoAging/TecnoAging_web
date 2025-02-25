import { PartialType } from '@nestjs/mapped-types';
import { CreateAutenticacaoDto } from './create-autenticacao.dto';

export class UpdateAutenticacaoDto extends PartialType(CreateAutenticacaoDto) {}
