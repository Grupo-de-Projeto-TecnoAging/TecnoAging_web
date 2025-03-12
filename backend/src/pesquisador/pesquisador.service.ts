import { Injectable } from '@nestjs/common';
import { CreatePesquisadorDto } from './dto/create-pesquisador.dto';
import { UpdatePesquisadorDto } from './dto/update-pesquisador.dto';

@Injectable()
export class PesquisadorService {
  create(createPesquisadorDto: CreatePesquisadorDto) {
    return 'This action adds a new pesquisador';
  }

  findAll() {
    return `This action returns all pesquisador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pesquisador`;
  }

  update(id: number, updatePesquisadorDto: UpdatePesquisadorDto) {
    return `This action updates a #${id} pesquisador`;
  }

  remove(id: number) {
    return `This action removes a #${id} pesquisador`;
  }
}
