import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine';
import { UpdateMachineDto } from './dto/update-machine';
import { Machine } from '../shared/machine';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine.name) private readonly machineModel: Model<Machine>
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const createdMachine = new this.machineModel(createMachineDto);
    return createdMachine.save();
  }

  async update(id: string, updateMachineDto: UpdateMachineDto): Promise<Machine> {
    const machine = await this.machineModel.findById(id);

    if (!machine) {
      throw new Error('Máquina não encontrada');
    }

    if (updateMachineDto.maintenanceHistory) {
     
      await this.machineModel.updateOne(
        { _id: id },
        { $push: { maintenanceHistory: { $each: updateMachineDto.maintenanceHistory } } }
      );
    } else {
      
      await this.machineModel.updateOne({ _id: id }, updateMachineDto);
    }

    return this.machineModel.findById(id); 
  }

  async findById(id: string): Promise<Machine> {
    const machine = await this.machineModel.findById(id);
    if (!machine) {
      throw new Error('Máquina não encontrada');
    }
    return machine;
  }

  async findAll(): Promise<Machine[]> {
    return this.machineModel.find().exec();
  }

  async delete(id: string): Promise<void> {
    const machine = await this.machineModel.findByIdAndDelete(id);
    if (!machine) {
      throw new Error('Máquina não encontrada');
    }
  }
}
