import { Module } from '@nestjs/common';
import { AddresssService } from './address.service';
import { AddresssController } from './address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './entities/address.entity';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  controllers: [AddresssController],
  providers: [AddresssService],
  exports: [SequelizeModule, AddresssService],
})
export class AddresssModule {}
