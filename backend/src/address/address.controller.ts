import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddresssService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddresssController {
  constructor(private readonly addresssService: AddresssService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addresssService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addresssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addresssService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addresssService.updateById(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addresssService.removeById(id);
  }
}
 