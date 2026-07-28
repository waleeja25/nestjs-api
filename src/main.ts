import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common';
import { HttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    Logger.log('Database connected successfully', 'Database');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') ?? 3000;

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`, 'Main');
}
bootstrap().catch((error) => {
  Logger.error(error);
  process.exit(1);
});
