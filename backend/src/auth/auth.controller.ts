import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { cpf: string; password: string }) {
    const { token, user } = await this.authService.login(body.cpf, body.password);
    return { mensagem: 'Login realizado com sucesso', token, user };
  }

  @Post('encrypt-password')
  async encryptPassword(@Body() body: { password: string }) {
    const passwordCriptografada = await this.authService.encryptPassword(body.password);
    return { mensagem: 'Password criptografada com sucesso', passwordCriptografada };
  }
}
