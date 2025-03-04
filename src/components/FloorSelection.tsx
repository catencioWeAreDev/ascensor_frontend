import React, { useState } from 'react';
import { webSocketService } from '../websocket';

interface FloorSelectionProps {
  onRequestElevator: (floor: number) => void;
}

const FloorSelection: React.FC<FloorSelectionProps> = ({ onRequestElevator }) => {
  const [floor, setFloor] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestElevator(floor);
    webSocketService.send({ type: 'requestElevator', floor });
  };

  return (
    <div>
      <h2>Solicitar Ascensor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Piso Actual:
          <input
            type="number"
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
            min="0"
            max="10"
          />
        </label>
        <button type="submit">Solicitar Ascensor</button>
      </form>
    </div>
  );
};

export default FloorSelection;