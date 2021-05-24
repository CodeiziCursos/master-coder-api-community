import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [''],
        queue: '',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.listen(() =>
    new Logger(bootstrap.name).log(
      `Api Community running in port ${process.env.SERVER_PORT || 3040}`,
    ),
  );
}
bootstrap();
