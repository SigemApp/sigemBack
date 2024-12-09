import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './shared/service.service';
import { CreateServiceDto } from './shared/dto/create-service';
import { UpdateServiceDto } from './shared/dto/update-service';
import { Service } from './shared/service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar o serviço' })
  @ApiBody({ description: 'Dados para criação do serviço', type: CreateServiceDto })
  @UseGuards(AuthGuard)
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os serviços' })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso' })
  @UseGuards(AuthGuard)
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':supplierId')
  @ApiOperation({ summary: 'Obter todos os serviços de um fornecedor' })
  @ApiResponse({ status: 200, description: 'Serviços encontrados com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @UseGuards(AuthGuard)
  async findBySupplier(@Param('supplierId') supplierId: string): Promise<Service[]> {
    return this.serviceService.findBySupplier(supplierId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um serviço pelo ID' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um serviço existente' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar o serviço' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.serviceService.delete(id);
  }
}
