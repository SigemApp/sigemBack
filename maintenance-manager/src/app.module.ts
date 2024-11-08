import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/users.controller';
import { APP_PIPE } from '@nestjs/core';
import { MachineModule } from './machine/machines.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/orquestrador'), 

    UsersModule,
    AuthModule,

    MachineModule, 
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
