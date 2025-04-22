import { Module } from '@nestjs/common';
import { HealthProfessionalService } from './healthProfessional.service';
import { HealthProfessionalController } from './healthProfessional.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthProfessional } from './entities/healthProfessional.entity';

@Module({
  imports: [SequelizeModule.forFeature([HealthProfessional])],
  controllers: [HealthProfessionalController],
  providers: [HealthProfessionalService],
  exports: [SequelizeModule, HealthProfessionalService]
})
export class HealthProfessionalModule {}
