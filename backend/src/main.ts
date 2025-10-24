import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://currency-testing.netlify.app', 'http://localhost:4200'],
      credentials: false,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
