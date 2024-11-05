import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/users.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/maintenance-manager'),
    UsersModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [ {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule {}
