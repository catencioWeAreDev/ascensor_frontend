import React, { useEffect, useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import FloorRequest from './FloorRequest';
import FloorState from '../interfaces/floor.interface';


const ElevatorPanel: React.FC = () => {
  const { messages } = useWebSocket();
  
  
  const [floorData, setFloorData] = useState<FloorState>({
    floor: 1,
    direction: 'up',
  });

  const [showFloorOptions, setShowFloorOptions] = useState<boolean>(false);

  useEffect(() => {
    if (messages.open === 1 && messages.currentFloor === floorData.floor) {
      console.log('Puerta abierta');
        setShowFloorOptions(true);
    } else {
      console.log('Puerta Cerrada');
        setShowFloorOptions(false);
    }
  }, [messages]);

  return (
    <div>
      <h2 className="elevator-title">Piso Ascensor</h2>
      <div className="elevator-floor">
        <p>{messages.currentFloor}</p>
      </div>
      <FloorRequest showFloorOptions={showFloorOptions} floorData={floorData}  setFloorData={setFloorData}/>
    </div>
  );
};

export default ElevatorPanel;