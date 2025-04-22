import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { ResearcherController } from './researcher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Researcher } from './entities/researcher.entity';

@Module({
  imports: [SequelizeModule.forFeature([Researcher])],
  controllers: [ResearcherController],
  providers: [ResearcherService],
  exports: [SequelizeModule, ResearcherService]
})
export class ResearcherModule {}
