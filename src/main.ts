import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestIdMiddleware } from './shared/middlewares/request-id/request-id.middleware';
import { VALIDATION_PIPE_OPTIONS } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.use(RequestIdMiddleware);
  app.enableCors();

   /** Swagger configuration*/
   const options = new DocumentBuilder()
   .setTitle('Nestjs API starter')
   .setDescription('Nestjs API description')
   .setVersion('1.0')
   .addBearerAuth()
   .build();

 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('swagger', app, document);

 const configService = app.get(ConfigService);
 const port = configService.get<number>('port');
 await app.listen(port);
}
bootstrap();
