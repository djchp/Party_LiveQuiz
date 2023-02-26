import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SocketioAdapter } from './socketioadapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useWebSocketAdapter(new SocketioAdapter(app,configService))
  await app.listen(3000);
}
bootstrap();
