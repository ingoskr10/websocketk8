import { injectable, inject } from 'inversify';
import { Server } from 'socket.io';
import { WebSocketPort } from '../../domain/ports/WebSocketPort';
import { Logger } from '../logger/Logger';

@injectable()
export class WebSocketAdapter implements WebSocketPort {
  private io: Server;

  constructor(
    @inject(Logger) private logger: Logger
  ) {
    this.io = new Server();
  }

  start(): void {
    this.io.listen(3001);
    this.logger.info('WebSocket server started on port 3001');
  }

  emit(event: string, data: any): void {
    this.io.emit(event, data);
  }
}