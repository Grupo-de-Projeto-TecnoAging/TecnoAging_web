import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { PatientModule } from 'src/patient/patient.module';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { HealthProfessionalModule } from 'src/healthProfessional/healthProfessional.module';
import { ResearcherModule } from 'src/researcher/researcher.module';

@Module({
  imports: [SequelizeModule.forFeature([Person, HealthProfessional, Researcher, Patient]), AuthModule, HealthProfessionalModule, ResearcherModule, PatientModule],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [SequelizeModule]
})
export class PeopleModule {}
