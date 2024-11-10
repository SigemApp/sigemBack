import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MachineService } from '../machine/shared/machine.service';
import { CreateMachineDto } from './shared/dto/create-machine';
import { UpdateMachineDto } from './shared/dto/update-machine';
import { Machine } from '../machine/shared/machine';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Machines') 
@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return this.machineService.create(createMachineDto);
  }

  @Get()
  findAll(): Promise<Machine[]> {
    return this.machineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Machine> {
    return this.machineService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto): Promise<Machine> {
    return this.machineService.update(id, updateMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.machineService.delete(id);
  }
}