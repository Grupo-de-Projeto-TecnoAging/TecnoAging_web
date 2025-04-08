import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PacientesService {

  constructor(
    @InjectModel(Paciente)
    private readonly pacienteModel: typeof Paciente,
  ) { }

  async create(createPacienteDto: CreatePacienteDto, cpf: string): Promise<Paciente> {
    if (!createPacienteDto.endereco || !createPacienteDto.data_nascimento || !createPacienteDto.escolaridade || !createPacienteDto.nivel_socio_economico || !createPacienteDto.peso || !createPacienteDto.altura || !createPacienteDto.idade || !createPacienteDto.queda) {
      throw new BadRequestException('Endereço, data de nascimento, escolaridade, nível socioeconômico, peso e altura são obrigatórios para o perfil de paciente.');
    }
    const paciente = await this.pacienteModel.create({
      ...createPacienteDto,
      cpf: cpf,
    });

    return paciente;
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteModel.findAll();
  }

  async findOne(cpf: string): Promise<Paciente> {
    const paciente = await this.pacienteModel.findByPk(cpf);
    if (!paciente) {
      throw new NotFoundException(`Paciente com id ${cpf} não encontrado`);
    }
    return paciente;
  }

  async updateById(id: string, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.pacienteModel.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente com id ${id} não encontrada`);
    }

    await paciente.update(updatePacienteDto);
    return paciente;
  }

  async removeById(id: string): Promise<Paciente> {
    const paciente = await this.pacienteModel.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente com id ${id} não encontrada`);
    }

    await paciente.destroy();
    return paciente;
  }

  /*private calculaIdade(data_nascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();
    if (mes < 0 || (mes === 0 && dia < 1)) {
      idade--;
    }
    return idade;
  }*/
}
