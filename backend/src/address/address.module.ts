import { Module } from '@nestjs/common';
import { EnderecosService } from './address.service';
import { EnderecosController } from './address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Endereco } from './entities/address.entity';

@Module({
  imports: [SequelizeModule.forFeature([Endereco])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
  exports: [SequelizeModule, EnderecosService],
})
export class EnderecosModule {}
