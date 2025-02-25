import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1]; // "Bearer token_aqui"

    try {
      if (!process.env.JWT_SECRET) {
        throw new UnauthorizedException('JWT_SECRET não definido');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // Armazena os dados do usuário no request

      return true; // Se o token for válido, permite o acesso
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
