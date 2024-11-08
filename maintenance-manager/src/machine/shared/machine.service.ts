import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine';
import { UpdateMachineDto } from './dto/update-machine';
import { Machine } from '../shared/machine';

@Injectable()
export class MachineService {
  constructor(@InjectModel('Machine') private readonly machineModel: Model<Machine>) {}

  async findAll(): Promise<Machine[]> {
    return this.machineModel.find().exec();
  }

  async findOne(id: string): Promise<Machine | null> {
    return this.machineModel.findById(id).exec();
  }

  async findOneBySerialNumber(serialNumber: string): Promise<Machine> {
    const machine = await this.machineModel.findOne({ serialNumber }).exec();

    if (!machine) {
      throw new NotFoundException('Máquina não encontrada');
    }
    return machine;
  }

  async existingMachine(serialNumber: string): Promise<Machine | null> {
    const machine = await this.machineModel.findOne({ serialNumber }).exec();
    return machine;
  }

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const newMachine = new this.machineModel(createMachineDto);
    return newMachine.save();
  }

  async update(id: string, updateMachineDto: UpdateMachineDto): Promise<Machine | null> {
    return this.machineModel.findByIdAndUpdate(id, updateMachineDto, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id: string): Promise<void> {
    const machine = await this.machineModel.findById(id).exec();
    if (!machine) {
      throw new NotFoundException('Máquina não encontrada');
    }
    await this.machineModel.deleteOne({ _id: id }).exec();
  }
}
