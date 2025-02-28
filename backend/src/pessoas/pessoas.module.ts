import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa]), AutenticacaoModule],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
