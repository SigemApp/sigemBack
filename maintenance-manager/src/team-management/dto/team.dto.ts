import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nome da equipe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Status ativo da equipe', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateTeamDto {
  @ApiPropertyOptional({ description: 'Nome da equipe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Status ativo da equipe' })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class AddCollaboratorDto {
  @ApiProperty({ description: 'ID do colaborador a ser adicionado à equipe' })
  @IsNotEmpty()
  @IsString()
  collaboratorId: string;
}
