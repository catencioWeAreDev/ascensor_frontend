import React from 'react';
import { webSocketService } from '../websocket';

interface ElevatorPanelProps {
  onSelectFloor: (floor: number) => void;
}

const floors: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ElevatorPanel: React.FC<ElevatorPanelProps> = ({ onSelectFloor }) => {
  const handleSelectFloor = (floor: number) => {
    onSelectFloor(floor);
    webSocketService.send({ type: 'selectFloor', floor });
  };

  return (
    <div>
      <h2>Seleccionar Piso de Destino</h2>
      <div className="button-grid">
        {floors.map((floor) => (
          <button key={floor} onClick={() => handleSelectFloor(floor)}>
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElevatorPanel;