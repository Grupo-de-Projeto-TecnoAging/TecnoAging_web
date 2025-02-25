import { Module } from '@nestjs/common';
import { TestesService } from './testes.service';
import { TestesController } from './testes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teste } from './entities/teste.entity';

@Module({
  imports: [SequelizeModule.forFeature([Teste])],
  controllers: [TestesController],
  providers: [TestesService],
})
export class TestesModule {}
