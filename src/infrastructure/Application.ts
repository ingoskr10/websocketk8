import { inject, injectable } from 'inversify';
import { DatabasePort } from '../domain/ports/DatabasePort';
import { WebSocketPort } from '../domain/ports/WebSocketPort';
import { Logger } from './logger/Logger';

@injectable()
export class Application {
  constructor(
    @inject('DatabasePort') private database: DatabasePort,
    @inject('WebSocketPort') private webSocket: WebSocketPort,
    @inject(Logger) private logger: Logger
  ) {}

  async start(): Promise<void> {
    try {
      await this.database.connect();
      this.webSocket.start();

      await this.database.listenToChanges('table_changes', (payload) => {
        this.webSocket.emit('data_change', payload);
        this.logger.info('Change detected and broadcasted:', payload);
      });
    } catch (error) {
      this.logger.error('Application startup error:', error);
      process.exit(1);
    }
  }
}