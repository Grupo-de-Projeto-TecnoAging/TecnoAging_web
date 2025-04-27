import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-address.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {}
