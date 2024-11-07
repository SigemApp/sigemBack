import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',  
    methods: 'GET,POST,PUT,DELETE',  
    allowedHeaders: 'Content-Type, Authorization',  
    credentials: true,  
  });

  const config = new DocumentBuilder()
    .setTitle('maintenance-manager API')
    .setDescription('Documentação...')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
