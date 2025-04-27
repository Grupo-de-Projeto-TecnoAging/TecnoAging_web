/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesModule } from './unidades/unidades.module';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './person/people.module';
import { HomeModule } from './home/home.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { HealthProfessionalModule } from './healthProfessional/healthProfessional.module';
import { Unidade } from './unidades/entities/unidade.entity';
import { Person } from './person/entities/person.entity';
import { HealthProfessional } from './healthProfessional/entities/healthProfessional.entity';
import { SensorDataModule } from './sensorData/sensorData.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { PatientsModule } from './patient/patients.module';
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
    UnidadesModule,
    AuthModule,
    PeopleModule,
    HomeModule,
    EvaluationModule,
    HealthProfessionalModule,
    PatientsModule,
    ResearcherModule,
    SensorDataModule,
    EnderecosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
