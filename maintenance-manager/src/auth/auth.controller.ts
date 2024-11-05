import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { UsersService } from '../user/shared/users.service';
import { SignInDto } from './shared/dto/singIn.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Rota para autenticar um usuário e gerar tokens de acesso e atualização.
   * @param signInDto Os dados de autenticação do usuário.
   * @returns Um token de acesso JWT e um token de atualização.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário e gerar tokens' })
  @ApiBody({ type: SignInDto, description: 'Dados de autenticação do usuário' })
  @ApiOkResponse({
    description: 'Autenticação bem-sucedida - tokens de acesso e atualização gerados',
  })
  @ApiBadRequestResponse({
    description: 'Usuário não encontrado ou senha incorreta',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor ao autenticar o usuário',
  })
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;
      return await this.authService.signIn(email, password);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno do servidor ao autenticar o usuário',
      );
    }
  }

  /**
   * Rota para renovar tokens de acesso usando um token de atualização.
   * @param refreshToken O token de atualização do usuário.
   * @returns Um novo token de acesso JWT e um novo token de atualização.
   * @throws UnauthorizedException Se o token de atualização for inválido ou expirado.
   */
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Renovar tokens de acesso' })
  @ApiBody({ description: 'Token de atualização', schema: { example: { refreshToken: 'token_aqui' } } })
  @ApiOkResponse({
    description: 'Tokens de acesso e atualização renovados',
  })
  @ApiBadRequestResponse({
    description: 'Token de atualização inválido ou expirado',
  })
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Token de atualização não fornecido');
    }
    
    try {
      return await this.authService.refreshTokens(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
