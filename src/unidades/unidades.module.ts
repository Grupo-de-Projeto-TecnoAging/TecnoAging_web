import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';

@Module({
  controllers: [UnidadesController],
  providers: [UnidadesService],
})
export class UnidadesModule {}
