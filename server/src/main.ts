import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
// import * as csrf from 'csurf'
// import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  app.use(cookieParser())
  // app.use(csrf())

  // var csrfProtection = csrf({ cookie: true})
  // app.use(csrfProtection)

  await app.listen(5000);
}
bootstrap();
