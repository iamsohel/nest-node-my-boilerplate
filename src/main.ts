import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
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
