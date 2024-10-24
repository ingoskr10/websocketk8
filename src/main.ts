import 'reflect-metadata';
import { container } from './infrastructure/ioc/container';
import { Application } from './infrastructure/Application';

async function bootstrap() {
  const app = container.get<Application>(Application);
  await app.start();
}

bootstrap().catch(console.error);