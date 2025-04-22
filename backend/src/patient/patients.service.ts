import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/person/entities/person.entity';
import { ReturnPatientDto } from './dto/return-patient.dto';

@Injectable()
export class PatientsService {

  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
  ) { }

  async create(createPatientDto: CreatePatientDto, cpf: string): Promise<Patient> {
    if (!createPatientDto.id_endereco || !createPatientDto.dateOfBirth || !createPatientDto.educationLevel || !createPatientDto.socioeconomicStatus || !createPatientDto.weight || !createPatientDto.height) {
      throw new BadRequestException('Endereço, data de nascimento, educationLevel, nível socioeconômico, weight e height são obrigatórios para o perfil de patient.');
    }
    const patient = await this.patientModel.create({
      ...createPatientDto,
      cpf: cpf,
    });

    return patient;
  }

  async findAll(): Promise<ReturnPatientDto[]> {
    const patients = await this.patientModel.findAll({
      include: [{ model: Person, attributes: ['name'] }],
    });
  
    return patients.map(patient => ({
      name: patient.person?.name,
      cpf: patient.cpf,
      id_endereco: patient.id_endereco,
      dateOfBirth: patient.dateOfBirth,
      educationLevel: patient.educationLevel,
      socioeconomicStatus: patient.socioeconomicStatus,
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      downFall: patient.downFall,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    }));
  }

  async findOne(cpf: string): Promise<ReturnPatientDto> {
    const patient = await this.patientModel.findByPk(cpf, { include: [{ model: Person, attributes: ['name'] }],});
    if (!patient) {
      throw new NotFoundException(`Patient com id ${cpf} não encontrado`);
    }
    return {
      name: patient.person?.name,
      cpf: patient.cpf,
      id_endereco: patient.id_endereco,
      dateOfBirth: patient.dateOfBirth,
      educationLevel: patient.educationLevel,
      socioeconomicStatus: patient.socioeconomicStatus,
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      downFall: patient.downFall,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }

  async updateById(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientModel.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient com id ${id} não encontrada`);
    }

    await patient.update(updatePatientDto);
    return patient;
  }

  async removeById(id: string): Promise<Patient> {
    const patient = await this.patientModel.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient com id ${id} não encontrada`);
    }

    await patient.destroy();
    return patient;
  }

  /*private calculaage(dateOfBirth: Date): number {
    const hoje = new Date();
    const nascimento = new Date(dateOfBirth);
    let age = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();
    if (mes < 0 || (mes === 0 && dia < 1)) {
      age--;
    }
    return age;
  }*/
}
