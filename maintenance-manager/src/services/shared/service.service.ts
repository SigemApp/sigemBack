import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../shared/service';
import { CreateServiceDto } from './dto/create-service';
import { UpdateServiceDto } from './dto/update-service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findBySupplier(supplierId: string): Promise<Service[]> {
    return this.serviceModel.find({ supplierName: supplierId }).exec();
  }

  async findById(id: string): Promise<Service | null> {
    return this.serviceModel.findById(id).exec();  
  }
  
  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id).exec();
  }
}
