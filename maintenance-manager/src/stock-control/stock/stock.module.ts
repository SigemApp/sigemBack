import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Piece, PieceSchema } from './schema/piece.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Piece.name, schema: PieceSchema }])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
