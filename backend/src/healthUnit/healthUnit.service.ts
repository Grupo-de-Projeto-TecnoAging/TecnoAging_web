import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatehealthUnitDto } from './dto/create-healthUnit.dto';
import { UpdatehealthUnitDto } from './dto/update-healthUnit.dto';
import { healthUnit } from './entities/healthUnit.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class healthUnitService {
  constructor(
    @InjectModel(healthUnit)
    private readonly healthUnitModel: typeof healthUnit,
  ) { }

  async create(createhealthUnitDto: Partial<CreatehealthUnitDto>): Promise<healthUnit> {
    return this.healthUnitModel.create(createhealthUnitDto);
  }

  async findAll(): Promise<healthUnit[]> {
    return this.healthUnitModel.findAll();
  }

  async findOne(id: number): Promise<healthUnit> {
    const healthUnit = await this.healthUnitModel.findByPk(id);
    if (!healthUnit) {
      throw new NotFoundException(`healthUnit com id ${id} não encontrada`);
    }
    return healthUnit;
  }

  async updateById(id: string, updatehealthUnitDto: UpdatehealthUnitDto): Promise<healthUnit> {
    const healthUnit = await this.healthUnitModel.findOne({ where: { id } });
    if (!healthUnit) {
      throw new NotFoundException(`healthUnit com id ${id} não encontrada`);
    }

    await healthUnit.update(updatehealthUnitDto);
    return healthUnit;
  }

  async removeById(id: string): Promise<healthUnit> {
    const healthUnit = await this.healthUnitModel.findOne({ where: { id } });
    if (!healthUnit) {
      throw new NotFoundException(`healthUnit com id ${id} não encontrada`);
    }

    await healthUnit.destroy();
    return healthUnit;
  }
}
