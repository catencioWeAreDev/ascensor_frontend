import { useEffect, useState } from "react";

import WebSocketService from "../services/websocket.service";
import ElevatorState from "../interfaces/elevator.interface";
import ElevatorService from "../services/elevator.service";

const useWebSocket = () => {
    const wsService = new WebSocketService();
    const elevatorService = new ElevatorService();

    const [messages, setMessages] = useState<ElevatorState>({
        open: 0,
        currentFloor: 1,
        state: 0,
        direction: 'stay',
    });

    useEffect(() =>  {
        elevatorService.getElevator().then((data) => setMessages(data.data));
        wsService.connect((data) => {
            setMessages(data);
        });
    }, []);

    const closeConnection = () => {
        wsService.disconnect();
    };

    return { messages, closeConnection };
};

export default useWebSocket;