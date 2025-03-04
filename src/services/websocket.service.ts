import constants from "../utils/constans";

class WebSocketService {
    private socket: WebSocket | null = null;
    readonly url: string = constants.WS_URL;
  
    constructor() {}

    connect(onMessage: (data: any) => void) {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => console.log("🔌 Conectado a WebSocket");

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("📩 Mensaje recibido:", data);
                if (data.type === 'elevatorUpdate') {
                    onMessage(data.value);
                }
            };

            this.socket.onerror = (error) => console.error("❌ WebSocket Error:", error);
            this.socket.onclose = () => console.log("🔌 WebSocket cerrado");
        }
    }

    sendMessage(message: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn("⚠️ WebSocket no está conectado");
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default WebSocketService;