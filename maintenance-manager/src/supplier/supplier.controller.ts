import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SupplierService } from './shared/supplier.service';
import { CreateSupplierDto } from './shared/dto/create-supplier';
import { UpdateSupplierDto } from './shared/dto/update-supplier';
import { Supplier } from './shared/supplier';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar o fornecedor' })
  @ApiBody({ description: 'Dados para criação do fornecedor', type: CreateSupplierDto })
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os fornecedores' })
  @ApiResponse({ status: 200, description: 'Lista de fornecedores retornada com sucesso' })
  async findAll(): Promise<Supplier[]> {
    return this.supplierService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Obter um fornecedor pelo código' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async findOne(@Param('code') code: string): Promise<Supplier> {
    return this.supplierService.findByCode(code);
  }

  @Put(':code')
  @ApiOperation({ summary: 'Atualizar um fornecedor existente' })
  @ApiResponse({ status: 200, description: 'Fornecedor atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar o fornecedor' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async update(@Param('code') code: string, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierService.update(code, updateSupplierDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Deletar um fornecedor' })
  @ApiResponse({ status: 200, description: 'Fornecedor deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  async remove(@Param('code') code: string): Promise<void> {
    return this.supplierService.delete(code);
  }
}
