// src/websocket.ts
type WebSocketCallback = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.callbacks.forEach((callback) => callback(data));
    };

    this.socket.onclose = () => {
      console.log('WebSocket desconectado');
      setTimeout(() => this.connect(), 5000); // Reconectar después de 5 segundos
    };
  }

  public onMessage(callback: WebSocketCallback) {
    this.callbacks.push(callback);
  }

  public send(message: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }
}

export const webSocketService = new WebSocketService();