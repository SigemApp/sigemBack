import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, InternalServerErrorException, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './shared/users.service';
import { CreateUserDto } from './shared/dto/create-user.dto';
import { UpdateUserDto } from './shared/dto/update-user.dto';
import { User } from './shared/user';
import { UserGuard } from './user.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @ApiResponse({ status: 200, type: User, isArray: true, description: 'Lista de usuários' })
  @UseGuards(UserGuard)
  async findAll(): Promise<{ users: User[] }> {
    try {
      const users = await this.userService.findAll();
      if (!users.length) throw new NotFoundException('Nenhum usuário encontrado.');
      return { users };
    } catch {
      throw new InternalServerErrorException('Erro ao obter os usuários.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiResponse({ status: 200, type: User, description: 'Usuário encontrado' })
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: string): Promise<{ user: User }> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) throw new NotFoundException('Usuário não encontrado.');
      return { user };
    } catch {
      throw new InternalServerErrorException('Erro ao obter o usuário.');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, type: User, description: 'Usuário criado' })
  @ApiBadRequestResponse({ description: 'O email já está em uso.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    const existingUser = await this.userService.existingUser(createUserDto.email);
    if (existingUser) throw new BadRequestException('O email já está em uso.');

    try {
      const user = await this.userService.create(createUserDto);
      return { user };
    } catch {
      throw new InternalServerErrorException('Erro ao criar o usuário.');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiResponse({ status: 200, type: User, description: 'Usuário atualizado' })
  @UseGuards(UserGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ user: User }> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (!updatedUser) throw new NotFoundException('Usuário não encontrado.');
      return { user: updatedUser };
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar o usuário.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @UseGuards(UserGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.delete(id);
    } catch {
      throw new InternalServerErrorException('Erro ao remover o usuário.');
    }
  }
}