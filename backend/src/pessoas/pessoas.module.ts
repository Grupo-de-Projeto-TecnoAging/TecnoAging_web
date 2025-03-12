import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { Profissional } from 'src/profissional/entities/profissional.entity';
import { ProfissionalModule } from 'src/profissional/profissional.module';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa, Profissional]), AutenticacaoModule, ProfissionalModule],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [SequelizeModule]
})
export class PessoasModule {}
