import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function createNestApplication() {
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
}

// Imediatamente invoca a função para inicializar a aplicação NestJS
createNestApplication();

// Exporta a aplicação Express para o Cloud Functions tratar como seu ponto de entrada
exports.api = expressApp;
