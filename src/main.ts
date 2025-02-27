import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerAuthMiddleware } from './middleware/swagger-auth.middleware';
import * as express from 'express';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');


  app.enableCors();

  //* Swagger protected with basic auth
  app.use('/swagger', swaggerAuthMiddleware, express.static('swagger'));

  //* Swagger-Documentation
  const config = new DocumentBuilder()
    .setTitle('Animal Guard API')
    .setDescription('API documentation for Animal Guard')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();