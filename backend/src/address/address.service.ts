import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AddresssService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) { }

  async create(createAddressDto: Partial<CreateAddressDto>): Promise<Address> {
    return this.addressModel.create(createAddressDto);
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new NotFoundException(`Address com id ${id} não encontrada`);
    }
    return address;
  }

  async updateById(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressModel.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`address com id ${id} não encontrada`);
    }

    await address.update(updateAddressDto);
    return address;
  }

  async removeById(id: string): Promise<Address> {
    const address = await this.addressModel.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address com id ${id} não encontrada`);
    }

    await address.destroy();
    return address;
  }
}
