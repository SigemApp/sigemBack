import { IsString, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Fornecedor XYZ',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Código único do fornecedor',
    example: 'FXYZ12345',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Tipo do fornecedor (parte ou serviço)',
    example: 'service',
    enum: ['part', 'service'],
  })
  @IsString()
  @IsNotEmpty()
  type: 'part' | 'service';

  @ApiProperty({
    description: 'Endereço do fornecedor (opcional)',
    example: 'Rua das Flores, 123',
    required: false,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Nome do contato responsável',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({
    description: 'E-mail do contato',
    example: 'joao@exemplo.com',
  })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({
    description: 'Telefone de contato',
    example: '+55 11 98765-4321',
  })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  contactPhone: string;

  @ApiProperty({
    description: 'Website do fornecedor (opcional)',
    example: 'https://www.fornecedorxyz.com',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website: string;

  @ApiProperty({
    description: 'Descrição do serviço do fornecedor (opcional)',
    example: 'Fornece peças e componentes eletrônicos.',
    required: false,
  })
  @IsString()
  @IsOptional()
  serviceDescription: string;

  @ApiProperty({
    description: 'Notas adicionais sobre o fornecedor (opcional)',
    example: 'Fornecedor confiável e entrega rápida.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes: string;
}
