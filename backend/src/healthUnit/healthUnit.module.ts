import { Module } from '@nestjs/common';
import { healthUnitService } from './healthUnit.service';
import { healthUnitController } from './healthUnit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthUnit } from './entities/healthUnit.entity';

@Module({
  imports: [SequelizeModule.forFeature([HealthUnit])],
  controllers: [healthUnitController],
  providers: [healthUnitService],
})
export class healthUnitModule { }
