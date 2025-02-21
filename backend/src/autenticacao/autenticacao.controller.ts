import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CreateAutenticacaoDto } from './dto/create-autenticacao.dto';
import { UpdateAutenticacaoDto } from './dto/update-autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() body: {email: string, senha: string}){
    const usuario = await this.autenticacaoService.login(body.email, body.senha);
    return {mensagem: 'Login realizado com sucesso', usuario};
  }

  @Post('criptografar-senha')
  async criptografarSenha(@Body() body: { senha: string }) {
    const senhaCriptografada = await this.autenticacaoService.criptografarSenha(body.senha);
    return { mensagem: 'Senha criptografada com sucesso', senhaCriptografada };
  }

}
