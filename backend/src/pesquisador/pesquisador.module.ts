import { Module } from '@nestjs/common';
import { PesquisadorService } from './pesquisador.service';
import { PesquisadorController } from './pesquisador.controller';

@Module({
  controllers: [PesquisadorController],
  providers: [PesquisadorService],
})
export class PesquisadorModule {}
