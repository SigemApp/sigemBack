import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MachineService } from '../machine/shared/machine.service';
import { CreateMachineDto } from './shared/dto/create-machine';
import { UpdateMachineDto } from './shared/dto/update-machine';
import { Machine } from '../machine/shared/machine';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Machines') 
@ApiBearerAuth()
@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  @UseGuards(AuthGuard)  
  create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return this.machineService.create(createMachineDto);
  }

  @Get()
  @UseGuards(AuthGuard)  
  findAll(): Promise<Machine[]> {
    return this.machineService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)  
  findOne(@Param('id') id: string): Promise<Machine> {
    return this.machineService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)  
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto): Promise<Machine> {
    return this.machineService.update(id, updateMachineDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)  
  remove(@Param('id') id: string): Promise<void> {
    return this.machineService.delete(id);
  }
}