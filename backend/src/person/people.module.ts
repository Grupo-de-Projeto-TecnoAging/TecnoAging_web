import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { PatientsModule } from 'src/patient/patients.module';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { HealthProfessionalModule } from 'src/healthProfessional/healthProfessional.module';
import { ResearcherModule } from 'src/researcher/researcher.module';

@Module({
  imports: [SequelizeModule.forFeature([Person, HealthProfessional, Researcher, Patient]), AutenticacaoModule, HealthProfessionalModule, ResearcherModule, PatientsModule],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [SequelizeModule]
})
export class PeopleModule {}
