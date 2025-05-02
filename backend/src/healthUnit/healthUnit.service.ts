import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatehealthUnitDto } from './dto/create-healthUnit.dto';
import { UpdatehealthUnitDto } from './dto/update-healthUnit.dto';
import { HealthUnit } from './entities/healthUnit.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class healthUnitService {
  constructor(
    @InjectModel(HealthUnit)
    private readonly healthUnitModel: typeof HealthUnit
  ) { }

  async create(createhealthUnitDto: Partial<CreatehealthUnitDto>): Promise<HealthUnit> {
    return this.healthUnitModel.create(createhealthUnitDto);
  }

  async findAll(): Promise<HealthUnit[]> {
    return this.healthUnitModel.findAll();
  }

  async findOne(id: number): Promise<HealthUnit> {
    const healthUnit = await this.healthUnitModel.findByPk(id);
    if (!healthUnit) {
      throw new NotFoundException(`HealthUnit with id ${id} not found`);
    }
    return healthUnit;
  }

  async updateById(id: number, updatehealthUnitDto: UpdatehealthUnitDto): Promise<HealthUnit> {
    const healthUnit = await this.healthUnitModel.findOne({ where: { id } });
    if (!healthUnit) {
      throw new NotFoundException(`HealthUnit with id ${id} not found`);
    }

    await healthUnit.update(updatehealthUnitDto);
    return healthUnit;
  }

  async removeById(id: number): Promise<HealthUnit> {
    const healthUnit = await this.healthUnitModel.findOne({ where: { id } });
    if (!healthUnit) {
      throw new NotFoundException(`HealthUnit with id ${id} not found`);
    }

    await healthUnit.destroy();
    return healthUnit;
  }
}
