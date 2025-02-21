import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  private readonly rodadasSalt = 10;

  constructor(@InjectModel(Pessoas) private pessoasRepository: typeof Pessoas){}

  async criptografarSenha(senha: string): Promise<string>{
  const senhaHash = await bcrypt.hash(senha, this.rodadasSalt); 
  return senhaHash;
}

  async login(email: string, senha:string): Promise<Pessoas>{
    const usuario = await this.pessoasRepository.findOne({where: {email} });

    if(!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    if(!senhaCorreta){
      throw new UnauthorizedException('Senha incorreta');
    }
  
    return usuario;
  }

}
