export interface DatabasePort {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  listenToChanges(channel: string, callback: (payload: any) => void): Promise<void>;
}