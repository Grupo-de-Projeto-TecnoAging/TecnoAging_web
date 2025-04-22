import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { HealthProfessional } from 'src/healthProfessional/entities/healthProfessional.entity';
import { HealthProfessionalService } from 'src/healthProfessional/healthProfessional.service';
import { ResearcherService } from 'src/researcher/researcher.service';
import { PatientsService } from 'src/patient/patients.service';
import { CreateHealthProfessionalDto } from 'src/healthProfessional/dto/create-healthProfessional.dto';
import { CreateResearcherDto } from 'src/researcher/dto/create-researcher.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person)
    private readonly personModel: typeof Person,
    @InjectModel(HealthProfessional)
    private readonly profissionalModel: typeof HealthProfessional,
    @InjectModel(Researcher)
    private readonly pesquisadorModel: typeof Researcher,
    @InjectModel(Patient)
    private readonly pacienteModel: typeof Patient,
    private readonly autenticacaoService: AutenticacaoService,
    private readonly profissionalService: HealthProfessionalService,
    private readonly pesquisadorService: ResearcherService,
    private readonly pacientesService: PatientsService
  ) { }

  async create(
    createPersonDto: Partial<CreatePersonDto>,
    createProfissionalDto?: Partial<CreateHealthProfessionalDto>,
    createPesquisadorDto?: Partial<CreateResearcherDto>,
    createPacienteDto?: Partial<CreatePatientDto>
  ): Promise<Person> {

    if (!createPersonDto.password) {
      throw new BadRequestException('Senha é obrigatória');
    }

    if (!createPersonDto.cpf || !createPersonDto.profile) {
      throw new BadRequestException('CPF e Perfil são obrigatórios');
    }

    if (createPersonDto.profile === 'profissional') {
      if (!createPersonDto.email || !createPersonDto.expertise) {
        throw new BadRequestException('Dados de profissional são obrigatórios para este perfil: email e especialidade');
      }
    }

    if (createPersonDto.profile === 'pesquisador') {
      if (!createPersonDto.email || !createPersonDto.institution || !createPersonDto.fieldOfStudy || !createPersonDto.expertise) {
        throw new BadRequestException('Dados de pesquisador são obrigatórios para este perfil: email, instituicao, area e especialidade');
      }
    }

    if (createPersonDto.profile === 'paciente') {
      if (!createPersonDto.dateOfBirth || !createPersonDto.educationLevel || !createPersonDto.socioeconomicLevel || !createPersonDto.weight || !createPersonDto.height) {
        throw new BadRequestException('Dados de paciente são obrigatórios para este perfil: data_nascimento, escolaridade, nivel_socio_economico, peso e altura');
      }
    }

    createPersonDto.password = await this.autenticacaoService.criptografarSenha(createPersonDto.password);

    const person = await this.personModel.create(createPersonDto);

    if (person.profile === 'healthProfessional') {
      await this.profissionalService.create(createPersonDto as any, person.cpf);
    }

    if (person.profile === 'researcher') {
      await this.pesquisadorService.create(createPersonDto as any, person.cpf);
    }

    if (person.profile === 'patient') {
      await this.pacientesService.create(createPersonDto as any, person.cpf);
    }

    return person;
  }


  async findAll(): Promise<Person[]> {
    return await this.personModel.findAll();
  }


  async findOne(cpf: string): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person com cpf ${cpf} não encontrada`);
    }
    return person;
  }

  async updateByCpf(cpf: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person com cpf ${cpf} não encontrada`);
    }
    await person.update(updatePersonDto);
    return person;
  }

  async removeByCpf(cpf: string): Promise<Person> {
    const person = await this.personModel.findOne({ where: { cpf } });
    if (!person) {
      throw new NotFoundException(`Person com cpf ${cpf} não encontrada`);
    }

    await person.destroy();
    return person;
  }
}
