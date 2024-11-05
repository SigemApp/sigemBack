import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Método para verificar se um usuário pode acessar uma rota protegida.
   *
   * @param context O contexto da execução.
   * @returns Um valor booleano que indica se o usuário tem permissão para acessar a rota.
   * @throws UnauthorizedException Se a autenticação falhar ou se o token for inválido.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autorização ausente.');
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      if (!this.isValidToken(decodedToken, token)) {
        throw new UnauthorizedException('Acesso proibido. Token inválido ou expirado.');
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException('Acesso proibido. Token inválido ou expirado.');
      } else {
        throw new Error('Erro interno do servidor');
      }
    }
  }

  /**
   * Método para verificar se o token é válido com base em critérios personalizados.
   *
   * @param decodedToken O token JWT decodificado.
   * @param token O token JWT original.
   * @returns true se o token for válido, false caso contrário.
   */
  private isValidToken(decodedToken: any, token: string): boolean {
    return true;
  }

  /**
   * Método para extrair o token do cabeçalho de autorização da requisição.
   *
   * @param request O objeto de requisição HTTP.
   * @returns O token JWT ou undefined se não for encontrado.
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }
    return undefined;
  }
}
