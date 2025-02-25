import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() body: { cpf: string; senha: string }) {
    const { token, usuario } = await this.autenticacaoService.login(body.cpf, body.senha);
    return { mensagem: 'Login realizado com sucesso', token, usuario };
  }

  @Post('criptografar-senha')
  async criptografarSenha(@Body() body: { senha: string }) {
    const senhaCriptografada = await this.autenticacaoService.criptografarSenha(body.senha);
    return { mensagem: 'Senha criptografada com sucesso', senhaCriptografada };
  }
}
