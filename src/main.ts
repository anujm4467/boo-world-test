import * as dotenv from 'dotenv';
dotenv.config();

import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { initializeLogger } from './utils/logger';
import { gracefulShutdown } from './utils/graceful-shutdown';
import { AllExceptionsFilter } from './exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: initializeLogger(),
  });

  // Get the HttpAdapterHost to use with the AllExceptionsFilter.
  const httpAdapter = app.get(HttpAdapterHost);

  app.enableCors();

  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Initialize Swagger
  initializeSwagger(app);

  // Setup graceful shutdown
  gracefulShutdown(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
