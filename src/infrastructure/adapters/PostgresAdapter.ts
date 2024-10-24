import { inject, injectable } from 'inversify';
import { Client } from 'pg';
import { DatabasePort } from '../../domain/ports/DatabasePort';
import { Logger } from '../logger/Logger';

@injectable()
export class PostgresAdapter implements DatabasePort {
  private client: Client;

  constructor(
    @inject(Logger) private logger: Logger
  ) {
    this.client = new Client({
      host: 'dbcmtest.loc',
      user: 'recogidas_user',
      password: '123345',
      database: 'your_database'
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.info('Connected to PostgreSQL');
    } catch (error) {
      this.logger.error('PostgreSQL connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async listenToChanges(channel: string, callback: (payload: any) => void): Promise<void> {
    try {
      await this.client.query(`LISTEN ${channel}`);
      this.client.on('notification', (msg) => {
        callback(msg.payload);
      });
      this.logger.info(`Listening to channel: ${channel}`);
    } catch (error) {
      this.logger.error('Error setting up PostgreSQL notifications:', error);
      throw error;
    }
  }
}