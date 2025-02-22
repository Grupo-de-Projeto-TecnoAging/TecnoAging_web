import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Module({
  imports:[SequelizeModule.forFeature([Pessoa])],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}
