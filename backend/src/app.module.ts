/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { healthUnitModule } from './healthUnit/healthUnit.module';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { HomeModule } from './home/home.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { HealthProfessionalModule } from './healthProfessional/healthProfessional.module';
import { HealthUnit } from './healthUnit/entities/healthUnit.entity';
import { Person } from './person/entities/person.entity';
import { HealthProfessional } from './healthProfessional/entities/healthProfessional.entity';
import { SensorDataModule } from './sensorData/sensorData.module';
import { PatientModule } from './patient/patient.module';
import { ResearcherModule } from './researcher/researcher.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    healthUnitModule,
    AuthModule,
    PersonModule,
    HomeModule,
    EvaluationModule,
    HealthProfessionalModule,
    PatientModule,
    ResearcherModule,
    SensorDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
