import { Module } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';
import { ProfissionalController } from './profissional.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profissional } from './entities/profissional.entity';

@Module({
  imports: [SequelizeModule.forFeature([Profissional])],
  controllers: [ProfissionalController],
  providers: [ProfissionalService],
  exports: [SequelizeModule, ProfissionalService]
})
export class ProfissionalModule {}
