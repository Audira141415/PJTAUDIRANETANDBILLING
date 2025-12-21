import * as nodeCrypto from 'crypto';

// Polyfill for environments where `globalThis.crypto` is not defined (e.g. Node.js < 19).
// Some dependencies (e.g. @nestjs/schedule) rely on `crypto.randomUUID()`.
if (!(globalThis as any).crypto) {
  const webcrypto = (nodeCrypto as any).webcrypto;
  if (webcrypto) {
    (globalThis as any).crypto = webcrypto;
  }
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser for httpOnly cookies
  app.use(cookieParser());

  const allowedOrigins = new Set(
    [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.CUSTOMER_PORTAL_URL || 'http://localhost:3001',
      process.env.AUDIRANET_WEB_URL || 'http://localhost:3010',
    ].filter(Boolean),
  );

  app.enableCors({
    origin: (origin, callback) => {
      // Non-browser clients (mobile apps, curl, server-to-server) won't send Origin.
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
}
bootstrap().catch((error) => {
  console.error('❌ Failed to start backend:', error);
  process.exit(1);
});
