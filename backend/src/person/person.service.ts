import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
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
    private readonly patientService: PatientService,
    @InjectConnection() private readonly sequelize: Sequelize
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

      const profile = createPersonDto.profile;

      // Valida os dados específicos do perfil
      switch (profile) {
        case 'healthProfessional':
          if (
            !createHealthProfessionalDto?.email ||
            !createHealthProfessionalDto?.expertise
          ) {
            throw new BadRequestException('Dados de healthProfessional são obrigatórios');
          }
          break;
        case 'researcher':
          if (
            !createResearcherDto?.email ||
            !createResearcherDto?.institution ||
            !createResearcherDto?.fieldOfStudy ||
            !createResearcherDto?.expertise
          ) {
            throw new BadRequestException('Dados de researcher são obrigatórios');
          }
          break;
        case 'patient':
          if (
            !createPatientDto?.dateOfBirth ||
            !createPatientDto?.educationLevel ||
            !createPatientDto?.socioeconomicStatus ||
            !createPatientDto?.weight ||
            !createPatientDto?.height
          ) {
            throw new BadRequestException('Dados de patient são obrigatórios');
          }
          break;
        default:
          throw new BadRequestException('Perfil inválido');
      }

      createPersonDto.password = await this.authService.encryptPassword(createPersonDto.password);

      const transaction = await this.sequelize.transaction(); // Transação criada
      try {
        const person = await this.personModel.create(createPersonDto, { transaction });

        switch (profile) {
          case 'healthProfessional':
            await this.healthProfessionalService.create({ ...createHealthProfessionalDto, cpf: person.cpf } as CreateHealthProfessionalDto, person.cpf, transaction);
            break;
          case 'researcher':
            await this.researcherervice.create({ ...createResearcherDto, cpf: person.cpf } as CreateResearcherDto, person.cpf, transaction);
            break;
          case 'patient':
            await this.patientService.create({ ...createPatientDto, cpf: person.cpf } as CreatePatientDto, person.cpf, transaction);
            break;
        }

        await transaction.commit(); // Commit se tudo certo
        return person;

      } catch (err) {
        await transaction.rollback(); // Rollback em erro
        console.error('Erro ao criar pessoa e perfil:', err);
        throw new BadRequestException('Erro ao criar pessoa e perfil: ' + err.message);
      }
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
    if (updatePersonDto.password) {
      updatePersonDto.password = await this.authService.encryptPassword(updatePersonDto.password);
    }
    
    if (updatePersonDto.profile === 'healthProfessional') {
      if (!updatePersonDto.email || !updatePersonDto.expertise) {
        throw new BadRequestException('Datas of health professional are required for this profile: email e especialidade');
      }
    }
    if (updatePersonDto.profile === 'researcher') {
      if (!updatePersonDto.email || !updatePersonDto.institution || !updatePersonDto.fieldOfStudy || !updatePersonDto.expertise) {
        throw new BadRequestException('Datas of researcher are required for this profile: email, instituicao, area e especialidade');
      }
    }
    if (updatePersonDto.profile === 'patient') {
      if (!updatePersonDto.dateOfBirth || !updatePersonDto.educationLevel || !updatePersonDto.socioeconomicStatus || !updatePersonDto.weight || !updatePersonDto.height) {
        throw new BadRequestException('Datas of patient are required for this profile: dateOfBirth, educationStatus, socioeconomicStatus, weight e height');
      }
    }
   
    if (updatePersonDto.profile === 'healthProfessional') {
      await this.healthProfessionalModel.update(updatePersonDto, { where: { cpf } });
    }
    if (updatePersonDto.profile === 'researcher') {
      await this.pesquisadorModel.update(updatePersonDto, { where: { cpf } });
    }
    if (updatePersonDto.profile === 'patient') {
      await this.patientModel.update(updatePersonDto, { where: { cpf } });
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
