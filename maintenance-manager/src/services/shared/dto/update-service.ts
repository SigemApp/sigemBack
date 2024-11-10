import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Serviço de limpeza',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'ID do fornecedor relacionado',
    example: '60d1f1b0f1b2c8c57f9d7f6a',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  supplierName?: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Serviço completo de limpeza residencial.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
