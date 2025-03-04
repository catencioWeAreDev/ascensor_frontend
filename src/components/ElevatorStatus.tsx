import React, { useEffect, useState } from 'react';
import { ElevatorState } from '../types';
import { webSocketService } from '../websocket';

const ElevatorStatus: React.FC = () => {
  const [elevatorState, setElevatorState] = useState<ElevatorState>({
    open: 0,
    currentFloor: 0,
    state: 0,
    direction: 'stay',
  });

  useEffect(() => {
    webSocketService.onMessage((data) => {
      if (data.type === 'elevatorState') {
        setElevatorState(data.state);
      }
    });
  }, []);

  return (
    <div>
      <h2>Estado del Ascensor</h2>
      <p>Apertura de la puerta: {elevatorState.open ? 'Abierto' : 'Cerrado'}</p>
      <p>Piso Actual: {elevatorState.currentFloor}</p>
      <p>Estado: {elevatorState.state === 0 ? 'Detenido' : 'Iniciado'}</p>
      <p>Dirección: {elevatorState.direction}</p>
    </div>
  );
};

export default ElevatorStatus;