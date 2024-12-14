import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MaintenanceService } from '../maintenance/shared/maintenance.service';
import { CreateMaintenanceDto } from '../maintenance/shared/dto/create-maintenance';
import { UpdateMaintenanceDto } from '../maintenance/shared/dto/update-maintenance';
import { Maintenance } from '../maintenance/shared/maintenance';
import { AuthGuard } from 'src/auth/auth.guard';  
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Maintenance')
@ApiBearerAuth()
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)  
  async findById(@Param('id') id: string): Promise<Maintenance> {
    return this.maintenanceService.findById(id);
  }

  @Get()
  @UseGuards(AuthGuard)  
  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard)  
  async update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto
  ): Promise<Maintenance> {
    return this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)  
  async delete(@Param('id') id: string): Promise<void> {
    return this.maintenanceService.delete(id);
  }
}