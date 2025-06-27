import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Alarm Monitoring API')
    .setDescription('API for Alarm Monitoring System')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory());

  await app.listen(process.env.PORT ?? 3001);
  console.log(process.env.SUPABASE_URL);
}
bootstrap();
