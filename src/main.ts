import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT || 3040);
  new Logger(bootstrap.name).log(
    `Api gateway running in port ${process.env.SERVER_PORT || 3040}`,
  );
}
bootstrap();
