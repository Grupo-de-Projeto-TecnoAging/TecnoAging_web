import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
