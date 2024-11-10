import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMaintenanceDto } from './dto/create-maintenance';
import { UpdateMaintenanceDto } from './dto/update-maintenance';
import { Maintenance } from './maintenance';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(Maintenance.name) private readonly maintenanceModel: Model<Maintenance>
  ) {}

  async create(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    if (createMaintenanceDto.machine && !Types.ObjectId.isValid(createMaintenanceDto.machine)) {
      throw new BadRequestException('ID da máquina inválido');
    }

    const createdMaintenance = new this.maintenanceModel(createMaintenanceDto);
    return createdMaintenance.save();
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<Maintenance> {
    const maintenanceExists = await this.maintenanceModel.exists({ _id: id });
    if (!maintenanceExists) {
      throw new NotFoundException('Manutenção não encontrada');
    }

    if (updateMaintenanceDto.machine && !Types.ObjectId.isValid(updateMaintenanceDto.machine)) {
      throw new BadRequestException('ID da máquina inválido');
    }

    const updatedMaintenance = await this.maintenanceModel.findByIdAndUpdate(
      id,
      updateMaintenanceDto,
      { new: true }
    ).populate('machine'); 

    if (!updatedMaintenance) {
      throw new NotFoundException('Manutenção não encontrada');
    }

    return updatedMaintenance;
  }

  async findById(id: string): Promise<Maintenance> {
    const maintenance = await this.maintenanceModel.findById(id).populate('machine');
    if (!maintenance) {
      throw new NotFoundException('Manutenção não encontrada');
    }
    return maintenance;
  }

  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceModel.find().populate('machine').exec();
  }

  async delete(id: string): Promise<void> {
    const maintenance = await this.maintenanceModel.findByIdAndDelete(id);
    if (!maintenance) {
      throw new NotFoundException('Manutenção não encontrada');
    }
  }
}
