import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from './dto/create-healthProfessional.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HealthProfessional} from './entities/healthProfessional.entity';
import { Person } from 'src/person/entities/person.entity';
import { UpdateHealthProfessionalDto } from './dto/update-profissional.dto';

@Injectable()
export class HealthProfessionalService {
  constructor(
    @InjectModel(HealthProfessional)
    private readonly healthProfessionalModel: typeof HealthProfessional,
  ) { }
  
  async create(createhealthProfessionalDto: CreateHealthProfessionalDto, cpf: string): Promise<HealthProfessional> {
    
    if (!createhealthProfessionalDto.email || !createhealthProfessionalDto.expertise) {
      throw new BadRequestException("Email e especialidade são obrigatórios para o perfil healthProfessional.");
    }
     
    const healthProfessional = await this.healthProfessionalModel.create({
      ...createhealthProfessionalDto,
      cpf: cpf, 
    });

    return healthProfessional;
  }


  async findAll (): Promise<HealthProfessional[]> {
    return await this.healthProfessionalModel.findAll();
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

  findOne(cpf: string) {
    const healthProfessional = this.healthProfessionalModel.findOne({
      where: { cpf },
    });
    if (!healthProfessional) {
      throw new BadRequestException("healthProfessional não encontrado.");
    }
    return healthProfessional;
  }

  update(id: number, updatehealthProfessionalDto: UpdateHealthProfessionalDto) {
    return `This action updates a #${id} healthProfessional`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthProfessional`;
  }
}
