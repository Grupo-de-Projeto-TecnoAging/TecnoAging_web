import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(Person)
    private personsRepository: typeof Person
  ) {}

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async login(cpf: string, password: string): Promise<{ token: string; user: Person }> {
    const user = await this.personsRepository.findOne({ where: { cpf } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException('Password incorreta');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido no .env');
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, cpf: user.cpf }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return { token, user };
  }
}
