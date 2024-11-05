import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { config } from 'dotenv';

config();


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  /**
   * Método de ativação do guard que verifica a autenticação do usuário.
   *
   * @param context O contexto da execução.
   * @returns Um valor booleano que indica se o usuário está autenticado.
   * @throws UnauthorizedException Se a autenticação falhar.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Não autenticado. Faça login para acessar esta rota.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWTCONSTANTS,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Não autenticado. Faça login para acessar esta rota.');
    }

    return true;
  }

  /**
   * Extrai o token do cabeçalho de autorização da requisição.
   *
   * @param request O objeto de requisição HTTP.
   * @returns O token JWT ou undefined se não for encontrado.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
