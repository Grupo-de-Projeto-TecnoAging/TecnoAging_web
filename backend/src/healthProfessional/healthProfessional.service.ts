import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from './dto/create-healthProfessional.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HealthProfessional} from './entities/healthProfessional.entity';
import { Person } from 'src/person/entities/person.entity';
import { UpdateHealthProfessionalDto } from './dto/update-healthProfessional.dto';
import { Transaction } from 'sequelize';
import { ReturnHealthProfessionalDto } from './dto/return-healthProfessional.dto';

@Injectable()
export class HealthProfessionalService {
  constructor(
    @InjectModel(HealthProfessional)
    private readonly healthProfessionalModel: typeof HealthProfessional,
  ) { }
  
  async create(createhealthProfessionalDto: CreateHealthProfessionalDto, cpf: string, transaction?: Transaction): Promise<HealthProfessional> {
    
    if (!createhealthProfessionalDto.email || !createhealthProfessionalDto.expertise) {
      throw new BadRequestException("Email e especialidade são obrigatórios para o perfil healthProfessional.");
    }
     
    const healthProfessional = await this.healthProfessionalModel.create({
      ...createhealthProfessionalDto,
      cpf: cpf, }, {
      transaction,
      });

    return healthProfessional;
  }


  async findAll (): Promise<ReturnHealthProfessionalDto[]> {
    const healthProfessional = await this.healthProfessionalModel.findAll({
      include: [{ model: Person, attributes: ['name'] }],
    });

    return healthProfessional.map(healthProfessional => ({
      name: healthProfessional.person?.name,
      cpf: healthProfessional.cpf,
      email: healthProfessional.email,
      expertise: healthProfessional.expertise,
    }));
  }

  async findAllDetailed(): Promise<HealthProfessional[]> {
    return await this.healthProfessionalModel.findAll({
        include: [
            {
                model: Person,  
                required: true,
            },
        ],
    });
}

  async findOne(cpf: string): Promise<ReturnHealthProfessionalDto> {
    const healthProfessional = await this.healthProfessionalModel.findByPk(cpf, 
      { include: [{ model: Person, attributes: ['name'] }] });
    if (!healthProfessional) {
      throw new BadRequestException("healthProfessional não encontrado.");
    }
    return{
      name: healthProfessional.person?.name,
      cpf: healthProfessional.cpf,
      email: healthProfessional.email,
      expertise: healthProfessional.expertise,
    };
  }

  update(id: number, updatehealthProfessionalDto: UpdateHealthProfessionalDto) {
    return `This action updates a #${id} healthProfessional`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthProfessional`;
  }
}
