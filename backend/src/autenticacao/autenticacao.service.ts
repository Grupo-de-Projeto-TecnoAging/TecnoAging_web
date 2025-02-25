import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class AutenticacaoService {
  private readonly rodadasSalt = 10;

  constructor(
    @InjectModel(Pessoa)
    private pessoasRepository: typeof Pessoa
  ) {}

  async criptografarSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rodadasSalt);
    return bcrypt.hash(senha, salt);
  }

  async login(cpf: string, senha: string): Promise<{ token: string; usuario: Pessoa }> {
    const usuario = await this.pessoasRepository.findOne({ where: { cpf } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Senha incorreta');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido no .env');
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, cpf: usuario.cpf }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return { token, usuario };
  }
}
