import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/users.controller';
import { APP_PIPE } from '@nestjs/core';
import { MachineModule } from './machine/machines.module'; 
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ServiceModule } from './services/service.module';
import { SupplierModule } from './supplier/supplier.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/maintenance-manager'), 

    UsersModule,
    AuthModule,
    MachineModule, 
    MaintenanceModule,
    ServiceModule,
    SupplierModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,  
    },
  ],
})
export class AppModule {}
