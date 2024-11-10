import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineController } from '../machine/machines.controller';
import { MachineService } from '../machine/shared/machine.service';
import { MachineSchema } from '../machine/schemas/machine.schema';
import { MachineGuard } from './machine.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Machine', schema: MachineSchema }]),
  ],
  controllers: [MachineController],
  providers: [MachineService, MachineGuard],
})
export class MachineModule {}
