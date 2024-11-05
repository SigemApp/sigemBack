import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../user/shared/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await this.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return this.generateTokens(user.email, user.id);
  }

  private async generateTokens(email: string, userId: string) {
    const payload = { email, sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m', // Expiração curta para o access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // Expiração longa para o refresh token
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // Verifique se o usuário ainda existe e é válido
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Gere novos tokens
      return this.generateTokens(user.email, user.id);
    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
