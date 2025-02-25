import { Injectable } from '@nestjs/common';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';
import { Teste } from './entities/teste.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TestesService {
  constructor(
    @InjectModel(Teste)
    private readonly testesModel: typeof Teste,
  ) {}

  async create(createTestesDto: Partial<CreateTestesDto>): Promise<Teste> {
    return this.testesModel.create(createTestesDto);
  }

  findAll() {
    return `This action returns all testes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testis`;
  }

  update(id: number, updateTestesDto: UpdateTestesDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
