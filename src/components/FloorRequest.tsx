import React from 'react';

import FloorService from '../services/floor.service';
import IconButton from './general/IconButton';
import FloorState from '../interfaces/floor.interface';

interface Props {
  showFloorOptions: boolean;
  floorData: FloorState;
  setFloorData: (floor: FloorState) => void;
}

const FloorRequest: React.FC<Props> = ({ showFloorOptions, floorData, setFloorData }) => {

  const floorService = new FloorService();

  const handleFloor = (destinationFloor: number) => {
    setFloorData({
      direction: floorData.direction,
      floor: destinationFloor
    });
  };

  const handleDirection = async (value: 'up' | 'down') => {
    setFloorData({
      direction: value,
      floor: floorData.floor
    });
    await floorService.postFloor({...floorData, direction: value});
  };

  const handleDestinationFloor = async (destinationFloor: number) => {
    await floorService.postFloor({...floorData, floor: destinationFloor});
  };

  return (
    <div className="floor-request">
      {!showFloorOptions &&
        (<div className='floor-actions'>
          <p> Piso Actual: </p>
          <input
              type="number"
              className="custom-input"
              value={floorData.floor}
              onChange={(e) => handleFloor(Number(e.target.value))}
              min="0"
              max="10"
              required
            />
        </div>)
      }
        

      {!showFloorOptions &&
        (<div style={{ display: "flex", gap: "10px" }}  className='floor-actions '>
          <IconButton icon="↑" onClick={() => handleDirection('up')} />
          <IconButton icon="↓" onClick={() => handleDirection('down')} />
        </div>)
      }

      {showFloorOptions && (
        <div className="floor-options">
          <h2>Seleccione un piso de destino:</h2>
          <div className="button-grid">
            {floorData.direction === 'up'
              ? Array.from({ length: 20 - floorData.floor }, (_, i) => floorData.floor + i + 1).map((f) => (
                  <IconButton icon={`${f}`} onClick={() => handleDestinationFloor(f)}/>
                ))
              : Array.from({ length: floorData.floor }, (_, i) => floorData.floor - i - 1).map((f) => (
                  <IconButton icon={`${f}`} onClick={() => handleDestinationFloor(f)}/>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorRequest;