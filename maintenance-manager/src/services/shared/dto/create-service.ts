import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Serviço de limpeza',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID do fornecedor relacionado',
    example: '60d1f1b0f1b2c8c57f9d7f6a',
  })
  @IsMongoId()
  @IsNotEmpty()
  supplierName: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Serviço completo de limpeza residencial.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
