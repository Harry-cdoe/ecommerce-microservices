import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// api-gateway/src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Is line ko aise update karein:
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
