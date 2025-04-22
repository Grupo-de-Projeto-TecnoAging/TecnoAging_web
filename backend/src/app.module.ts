/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesModule } from './unidades/unidades.module';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PeopleModule } from './person/people.module';
import { HomeModule } from './home/home.module';
import { TestesModule } from './testes/testes.module';
import { HealthProfessionalModule } from './healthProfessional/healthProfessional.module';
import { Unidade } from './unidades/entities/unidade.entity';
import { Person } from './person/entities/person.entity';
import { HealthProfessional } from './healthProfessional/entities/healthProfessional.entity';
import { DadoSensorModule } from './dado-sensor/dado-sensor.module';
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
    AutenticacaoModule,
    PeopleModule,
    HomeModule,
    TestesModule,
    HealthProfessionalModule,
    PatientsModule,
    ResearcherModule,
    DadoSensorModule,
    EnderecosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
