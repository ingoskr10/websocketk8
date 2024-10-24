import { Container } from 'inversify';
import { DatabasePort } from '../../domain/ports/DatabasePort';
import { WebSocketPort } from '../../domain/ports/WebSocketPort';
import { PostgresAdapter } from '../adapters/PostgresAdapter';
import { WebSocketAdapter } from '../adapters/WebSocketAdapter';
import { Application } from '../Application';
import { Logger } from '../logger/Logger';

const container = new Container();

container.bind<DatabasePort>('DatabasePort').to(PostgresAdapter);
container.bind<WebSocketPort>('WebSocketPort').to(WebSocketAdapter);
container.bind<Application>(Application).toSelf();
container.bind<Logger>(Logger).toSelf();

export { container };