import { Module } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';
import { ProfissionalController } from './profissional.controller';

@Module({
  controllers: [ProfissionalController],
  providers: [ProfissionalService],
})
export class ProfissionalModule {}
