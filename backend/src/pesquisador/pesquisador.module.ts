import { Module } from '@nestjs/common';
import { PesquisadorService } from './pesquisador.service';
import { PesquisadorController } from './pesquisador.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pesquisador } from './entities/pesquisador.entity';

@Module({
  imports: [SequelizeModule.forFeature([Pesquisador])],
  controllers: [PesquisadorController],
  providers: [PesquisadorService],
  exports: [SequelizeModule, PesquisadorService]
})
export class PesquisadorModule {}
