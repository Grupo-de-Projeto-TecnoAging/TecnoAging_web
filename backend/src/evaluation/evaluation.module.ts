import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Evaluation } from './entities/evaluation.entity';

@Module({
  imports: [SequelizeModule.forFeature([Evaluation])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
