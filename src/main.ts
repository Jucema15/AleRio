import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://angular-map-rho.vercel.app', // Reemplaza con tu dominio real de Vercel
    ],
    credentials: true, // Si usas cookies o autenticación
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
