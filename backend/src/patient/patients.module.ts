import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [SequelizeModule, PatientsService],
})
export class PatientsModule {}
