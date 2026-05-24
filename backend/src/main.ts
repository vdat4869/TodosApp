import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { setupSwagger } from './config/swagger.config';
import { loggerInstance } from './shared/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerInstance,
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  const corsOrigin = configService.get<string>('app.corsOrigin');
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Global prefixes and versioning
  app.setGlobalPrefix('api');

  // Global Middlewares
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger Setup
  setupSwagger(app);

  const port = configService.get<number>('app.port') || 8080;
  await app.listen(port);
  loggerInstance.log(`Application is running on: http://localhost:${port}/api`);
  loggerInstance.log(
    `Swagger docs available at: http://localhost:${port}/api/docs`,
  );
}
void bootstrap();
