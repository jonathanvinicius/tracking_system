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
exports.api = expressApp;

if (process.env.NODE_ENV === 'localhost') {
  createNestApplication().then(() => {
    const PORT = process.env.PORT || 3000;
    expressApp.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
}
