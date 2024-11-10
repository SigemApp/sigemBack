import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceSchema } from './schemas/maintenance.schema';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from '../maintenance/shared/maintenance.service';
import { MaintenanceGuard } from '../maintenance/maintenance.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Maintenance', schema: MaintenanceSchema }]),
  ],
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    MaintenanceGuard,
  ],
})
export class MaintenanceModule {}
