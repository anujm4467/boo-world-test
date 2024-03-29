import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'fs';

export function initializeSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Boo World')
    .setDescription('Boo World API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (process.env.NODE_ENV === 'development') {
    mkdirSync('.postman', { recursive: true });
    writeFileSync('.postman/swagger-spec.json', JSON.stringify(document));
  }

  SwaggerModule.setup('api', app, document);
}
