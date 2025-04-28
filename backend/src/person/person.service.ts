import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { HealthProfessionalService } from 'src/healthProfessional/healthProfessional.service';
import { ResearcherService } from 'src/researcher/researcher.service';
import { PatientService } from 'src/patient/patient.service';
import { CreateHealthProfessionalDto } from 'src/healthProfessional/dto/create-healthProfessional.dto';
import { CreateResearcherDto } from 'src/researcher/dto/create-researcher.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person)
    private readonly personModel: typeof Person,
    @InjectModel(HealthProfessional)
    private readonly healthProfessionalModel: typeof HealthProfessional,
    @InjectModel(Researcher)
    private readonly pesquisadorModel: typeof Researcher,
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
    private readonly authService: AuthService,
    private readonly healthProfessionalService: HealthProfessionalService,
    private readonly researcherervice: ResearcherService,
    private readonly patientService: PatientService
  ) { }

  async create(
    createPersonDto: Partial<CreatePersonDto>,
    createHealthProfessionalDto?: Partial<CreateHealthProfessionalDto>,
    createResearcherDto?: Partial<CreateResearcherDto>,
    createPatientDto?: Partial<CreatePatientDto>
  ): Promise<Person> {

    if (!createPersonDto.password) {
      throw new BadRequestException('Password is required');
    }

    if (!createPersonDto.cpf || !createPersonDto.profile) {
      throw new BadRequestException('CPF and profile are required');
    }

    if (createPersonDto.profile === 'healthProfessional') {
      if (!createPersonDto.email || !createPersonDto.expertise) {
        throw new BadRequestException('Datas of health professional are required for this profile: email e especialidade');
      }
    }

    if (createPersonDto.profile === 'researcher') {
      if (!createPersonDto.email || !createPersonDto.institution || !createPersonDto.fieldOfStudy || !createPersonDto.expertise) {
        throw new BadRequestException('Datas of researcher are required for this profile: email, instituicao, area e especialidade');
      }
    }

    if (createPersonDto.profile === 'patient') {
      if (!createPersonDto.dateOfBirth || !createPersonDto.educationLevel || !createPersonDto.socioeconomicStatus || !createPersonDto.weight || !createPersonDto.height) {
        throw new BadRequestException('Datas of patient are required for this profile: dateOfBirth, educationStatus, socioeconomicStatus, weight e height');
      }
    }

    createPersonDto.password = await this.authService.encryptPassword(createPersonDto.password);

    const person = await this.personModel.create(createPersonDto);

    if (person.profile === 'healthProfessional') {
      await this.healthProfessionalService.create(createPersonDto as any, person.cpf);
    }

    if (person.profile === 'researcher') {
      await this.researcherervice.create(createPersonDto as any, person.cpf);
    }

    if (person.profile === 'patient') {
      await this.patientService.create(createPersonDto as any, person.cpf);
    }

    return person;
  }


  async findAll(): Promise<Person[]> {
    return await this.personModel.findAll();
  }


  async findOne(cpf: string): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person with cpf ${cpf} not found`);
    }
    return person;
  }

  async updateByCpf(cpf: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person with cpf ${cpf} not found`);
    }
    await person.update(updatePersonDto);
    return person;
  }

  async removeByCpf(cpf: string): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person with cpf ${cpf} not found`);
    }

    await person.destroy();
    return person;
  }
}
