import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './shared/supplier.service';
import { Supplier } from './shared/supplier';
import { SupplierSchema } from './schemas/supplier.schema';
import { SupplierGuard } from './supplier.guard';  

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierGuard], 
})
export class SupplierModule {}
