import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Person } from 'src/person/entities/person.entity';
import { ReturnPatientDto } from './dto/return-patient.dto';

@Injectable()
export class PatientService {

  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
  ) { }

  async create(createPatientDto: CreatePatientDto, cpf: string, transaction?: Transaction): Promise<Patient> {
    if (!createPatientDto.cpf ||
      !createPatientDto.cep ||
      !createPatientDto.street ||
      !createPatientDto.number ||
      !createPatientDto.neighborhood ||
      !createPatientDto.city ||
      !createPatientDto.state ||
      !createPatientDto.dateOfBirth ||
      !createPatientDto.educationLevel ||
      !createPatientDto.socioeconomicStatus ||
      !createPatientDto.weight ||
      !createPatientDto.height) {
      throw new BadRequestException('Address informations, date of birth, education Level, socioeconomic status, weight and height are required for patient profile.');
    }
    const patient = await this.patientModel.create({
      ...createPatientDto,
      cpf: cpf,
    }, { 
      transaction,
    });

    return patient;
  }

  async findAll(): Promise<ReturnPatientDto[]> {
    const patient = await this.patientModel.findAll({
      include: [{ model: Person, attributes: ['name'] }],
    });

    return patient.map(patient => ({
      name: patient.person?.name,
      cpf: patient.cpf,
      dateOfBirth: patient.dateOfBirth,
      educationLevel: patient.educationLevel,
      socioeconomicStatus: patient.socioeconomicStatus,
      cep: patient.cep,
      street: patient.street,
      number: patient.number,
      neighborhood: patient.neighborhood,
      city: patient.city,
      state: patient.state,
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      downFall: patient.downFall,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    }));
  }

  async findOne(cpf: string): Promise<ReturnPatientDto> {
    const patient = await this.patientModel.findByPk(cpf, { include: [{ model: Person, attributes: ['name'] }], });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${cpf} not found`);
    }
    return {
      name: patient.person?.name,
      cpf: patient.cpf,
      dateOfBirth: patient.dateOfBirth,
      educationLevel: patient.educationLevel,
      socioeconomicStatus: patient.socioeconomicStatus,
      cep: patient.cep,
      street: patient.street,
      number: patient.number,
      neighborhood: patient.neighborhood,
      city: patient.city,
      state: patient.state,
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      downFall: patient.downFall,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }

  async updateByCpf(cpf: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientModel.findOne({ where: { cpf } });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${cpf} not found`);
    }

    await patient.update(updatePatientDto);
    return patient;
  }

  async removeByCpf(cpf: string): Promise<Patient> {
    const patient = await this.patientModel.findOne({ where: { cpf } });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${cpf} not found`);
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
