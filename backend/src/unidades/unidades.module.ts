import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Unidade } from './entities/unidade.entity';

@Module({
  imports: [SequelizeModule.forFeature([Unidade])],
  controllers: [UnidadesController],
  providers: [UnidadesService],
})
export class UnidadesModule { }
