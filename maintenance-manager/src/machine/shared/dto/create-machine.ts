import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({ description: 'Nome da máquina', example: 'Máquina X' })
  @IsNotEmpty({ message: 'O campo "name" não pode estar vazio' })
  @IsString({ message: 'O campo "name" deve ser uma string' })
  name: string;

  @ApiProperty({ description: 'Tipo da máquina', example: 'CNC' })
  @IsNotEmpty({ message: 'O campo "type" não pode estar vazio' })
  @IsString({ message: 'O campo "type" deve ser uma string' })
  type: string;

  @ApiProperty({ description: 'Modelo da máquina', example: 'Model 3000' })
  @IsNotEmpty({ message: 'O campo "machineModel" não pode estar vazio' })
  @IsString({ message: 'O campo "machineModel" deve ser uma string' })
  machineModel: string;

  @ApiProperty({ description: 'Número de série da máquina', example: 'SN123456789' })
  @IsNotEmpty({ message: 'O campo "serialNumber" não pode estar vazio' })
  @IsString({ message: 'O campo "serialNumber" deve ser uma string' })
  serialNumber: string;

  @ApiProperty({ description: 'Localização da máquina', example: 'Fábrica 01' })
  @IsNotEmpty({ message: 'O campo "location" não pode estar vazio' })
  @IsString({ message: 'O campo "location" deve ser uma string' })
  location: string;

  @ApiProperty({ description: 'Data de fabricação da máquina', example: '2022-08-15' })
  @IsNotEmpty({ message: 'O campo "manufacturingDate" não pode estar vazio' })
  @IsDateString({}, { message: 'O campo "manufacturingDate" deve ser uma data válida no formato ISO 8601' }) 
  manufacturingDate: string;

  @ApiProperty({ description: 'Imagem da máquina (opcional)', example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "image" deve ser uma string' })
  image?: string;

  @ApiProperty({ description: 'Histórico de manutenções da máquina', default: [] })
  maintenanceHistory: string[];
}
