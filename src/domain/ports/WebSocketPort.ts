export interface WebSocketPort {
  emit(event: string, data: any): void;
  start(): void;
}