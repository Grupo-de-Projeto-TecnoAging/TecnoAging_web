/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesModule } from './unidades/unidades.module';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';

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
      synchronize:  process.env.NODE_ENV !== 'production',
    }),
    UnidadesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
