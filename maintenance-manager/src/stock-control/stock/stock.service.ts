import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Piece, PieceDocument } from './schema/piece.schema';

@Injectable()
export class StockService {
  constructor(@InjectModel(Piece.name) private pieceModel: Model<PieceDocument>) {}

  // CRUD Operations
  async create(data: Partial<Piece>): Promise<Piece> {
    const piece = new this.pieceModel(data);
    return piece.save();
  }

  async findAll(): Promise<Piece[]> {
    return this.pieceModel.find().exec();
  }

  async findOne(id: string): Promise<Piece> {
    const piece = await this.pieceModel.findById(id).exec();
    if (!piece) throw new NotFoundException('Piece not found');
    return piece;
  }

  async update(id: string, data: Partial<Piece>): Promise<Piece> {
    const updatedPiece = await this.pieceModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedPiece) throw new NotFoundException('Piece not found');
    return updatedPiece;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pieceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Piece not found');
  }

  // Register Entry of Pieces
  async registerEntry(id: string, quantity: number): Promise<Piece> {
    const piece = await this.findOne(id);
    piece.quantity += quantity;
    return this.update(id, { quantity: piece.quantity });
  }

  // Register Exit of Pieces
  async registerExit(id: string, quantity: number): Promise<Piece> {
    const piece = await this.findOne(id);
    if (piece.quantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }
    piece.quantity -= quantity;
    return this.update(id, { quantity: piece.quantity });
  }
}
