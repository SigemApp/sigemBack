import { IsString, IsDateString, IsEnum, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaintenanceDto {
  @ApiProperty({
    description: 'Número da ordem de manutenção',
    example: 'ORD123456',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiProperty({
    description: 'ID da máquina associada à manutenção',
    example: '60e5f7a7b579f404f8249f3d',  
    required: false,
  })
  @IsString()
  @IsOptional()
  machine?: string; 

  @ApiProperty({
    description: 'Data de abertura da manutenção',
    example: '2024-11-07T09:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  openingDate?: string;

  @ApiProperty({
    description: 'Data de conclusão prevista para a manutenção',
    example: '2024-11-10T09:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  completionDeadline?: string;

  @ApiProperty({
    description: 'Equipe responsável pela manutenção',
    example: 'Equipe de Manutenção A',
    required: false,
  })
  @IsString()
  @IsOptional()
  responsibleTeam?: string;

  @ApiProperty({
    description: 'Status da manutenção',
    example: 'Pendente',
    enum: ['Em Andamento', 'Pendente', 'Concluído', 'Cancelado'],
    required: false,
  })
  @IsEnum(['Em Andamento', 'Pendente', 'Concluído', 'Cancelado'])
  @IsOptional()
  status?: 'Em Andamento' | 'Pendente' | 'Concluído' | 'Cancelado';

  @ApiProperty({
    description: 'Descrição detalhada da manutenção',
    example: 'Manutenção preventiva realizada na máquina X.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Prioridade da manutenção',
    example: 'Média',
    enum: ['Baixa', 'Média', 'Alta'],
    required: false,
  })
  @IsEnum(['Baixa', 'Média', 'Alta'])
  @IsOptional()
  priority?: 'Baixa' | 'Média' | 'Alta';

  @ApiProperty({
    description: 'Tipo de manutenção (Preventiva ou Corretiva)',
    example: 'Preventiva',
    enum: ['Preventiva', 'Corretiva'],
    required: false,
  })
  @IsEnum(['Preventiva', 'Corretiva'])
  @IsOptional()
  maintenanceType?: 'Preventiva' | 'Corretiva';

  @ApiProperty({
    description: 'Arquivos relacionados à manutenção',
    example: ['https://example.com/arquivo1.pdf', 'https://example.com/arquivo2.pdf'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  files?: string[];

  @ApiProperty({
    description: 'Comentários adicionais sobre a manutenção',
    example: 'A manutenção foi concluída com sucesso.',
    required: false,
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({
    description: 'Itens de estoque utilizados na manutenção',
    example: ['Peça X', 'Peça Y'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  stockItems?: string[];

  @ApiProperty({
    description: 'Serviços prestados durante a manutenção',
    example: ['Serviço A', 'Serviço B'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  services?: string[];
}
