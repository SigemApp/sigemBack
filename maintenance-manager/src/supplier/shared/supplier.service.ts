import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from './supplier';
import { CreateSupplierDto } from './dto/create-supplier';
import { UpdateSupplierDto } from './dto/update-supplier';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('Supplier') private readonly supplierModel: Model<Supplier>,
  ) {}

  // Criar um fornecedor
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  // Encontrar todos os fornecedores
  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }

  // Encontrar fornecedor por código (code)
  async findByCode(code: string): Promise<Supplier> {
    return this.supplierModel.findOne({ code }).exec();
  }

  // Atualizar fornecedor por código
  async update(code: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierModel.findOneAndUpdate({ code }, updateSupplierDto, { new: true }).exec();
  }

  // Deletar fornecedor por código
  async delete(code: string): Promise<void> {
    await this.supplierModel.findOneAndDelete({ code }).exec();
  }
}
