import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSupplierDto {
  @ApiProperty({
    description: 'Nome do fornecedor (opcional)',
    example: 'Fornecedor XYZ',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Código único do fornecedor (opcional)',
    example: 'FXYZ12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Tipo do fornecedor (parte ou serviço) (opcional)',
    example: 'service',
    enum: ['part', 'service'],
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: 'part' | 'service';

  @ApiProperty({
    description: 'Endereço do fornecedor (opcional)',
    example: 'Rua das Flores, 123',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Nome do contato responsável (opcional)',
    example: 'João da Silva',
    required: false,
  })
  @IsString()
  @IsOptional()
  contactName?: string;

  @ApiProperty({
    description: 'E-mail do contato (opcional)',
    example: 'joao@exemplo.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    description: 'Telefone de contato (opcional)',
    example: '+55 11 98765-4321',
    required: false,
  })
  @IsPhoneNumber(null)
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({
    description: 'Website do fornecedor (opcional)',
    example: 'https://www.fornecedorxyz.com',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({
    description: 'Descrição do serviço do fornecedor (opcional)',
    example: 'Fornece peças e componentes eletrônicos.',
    required: false,
  })
  @IsString()
  @IsOptional()
  serviceDescription?: string;

  @ApiProperty({
    description: 'Notas adicionais sobre o fornecedor (opcional)',
    example: 'Fornecedor confiável e entrega rápida.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
