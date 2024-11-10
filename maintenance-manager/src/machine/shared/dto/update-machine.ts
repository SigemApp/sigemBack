import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMachineDto {
  @ApiProperty({ description: 'Nome da máquina', example: 'Máquina X', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "name" deve ser uma string' })
  name?: string;

  @ApiProperty({ description: 'Tipo da máquina', example: 'CNC', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "type" deve ser uma string' })
  type?: string;

  @ApiProperty({ description: 'Modelo da máquina', example: 'Model 3000', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "machineModel" deve ser uma string' })
  machineModel?: string;

  @ApiProperty({ description: 'Número de série da máquina', example: 'SN123456789', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "serialNumber" deve ser uma string' })
  serialNumber?: string;

  @ApiProperty({ description: 'Localização da máquina', example: 'Fábrica 01', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "location" deve ser uma string' })
  location?: string;

  @ApiProperty({ description: 'Imagem da máquina (opcional)', example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString({ message: 'O campo "image" deve ser uma string' })
  image?: string;

  @ApiProperty({ description: 'Histórico de manutenções da máquina', required: false })
  @IsOptional()
  maintenanceHistory?: string[];

  @ApiProperty({ description: 'Data de fabricação da máquina', example: '2022-08-15', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'O campo "manufacturingDate" deve ser uma data válida no formato ISO 8601' })
  manufacturingDate?: string;
}
