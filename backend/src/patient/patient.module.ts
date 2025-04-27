import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [SequelizeModule, PatientService],
})
export class PatientModule {}
