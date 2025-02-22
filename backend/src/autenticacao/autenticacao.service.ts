import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class AutenticacaoService {
  private readonly rodadasSalt = 10;

  constructor(
    @InjectModel(Pessoa)
    private pessoasRepository: typeof Pessoa){}



  async criptografarSenha(senha: string): Promise<string>{
    const salt = await bcrypt.genSalt(this.rodadasSalt);
    return bcrypt.hash(senha, salt); 
   
}

  async login(email: string, senha:string): Promise<Pessoa>{
    const usuario = await this.pessoasRepository.findOne({where: {email} });

    if(!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if(!senhaCorreta){
      throw new UnauthorizedException('Senha incorreta');
    }
  
    return usuario;
  }

}
