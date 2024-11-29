import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PieceDocument = Piece & Document;

@Schema()
export class Piece {
  @ApiProperty({ description: 'Nome da peça', example: 'Parafuso M8' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Código único da peça', example: 'M8-12345' })
  @Prop({ required: true, unique: true })
  code: string;

  @ApiProperty({ description: 'Fornecedor da peça', example: 'Fornecedor X' })
  @Prop({ required: true })
  supplier: string;

  @ApiProperty({ description: 'Quantidade disponível no estoque', example: 100 })
  @Prop({ required: true })
  quantity: number;

  @ApiProperty({ description: 'Valor unitário da peça', example: 5.75 })
  @Prop({ required: true })
  unitValue: number;
}

export const PieceSchema = SchemaFactory.createForClass(Piece);
