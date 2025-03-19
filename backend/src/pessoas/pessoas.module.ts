import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { Profissional } from 'src/profissional/entities/profissional.entity';
import { ProfissionalModule } from 'src/profissional/profissional.module';
import { Pesquisador } from 'src/pesquisador/entities/pesquisador.entity';
import { PesquisadorModule } from 'src/pesquisador/pesquisador.module';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa, Profissional, Pesquisador, Paciente]), AutenticacaoModule, ProfissionalModule, PesquisadorModule, PacientesModule],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [SequelizeModule]
})
export class PessoasModule {}
