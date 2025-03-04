// src/components/FloorRequest.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ElevatorState {
  open: number; // 0: cerrado, 1: abierto
  currentFloor: number;
  state: number; // 0: detenido, 1: en movimiento
  direction: 'up' | 'down' | 'stay';
}

const FloorRequest: React.FC = () => {
  const [floor, setFloor] = useState<number>(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [elevatorState, setElevatorState] = useState<ElevatorState>({
    open: 0,
    currentFloor: 0,
    state: 0,
    direction: 'stay',
  });
  const [showFloorOptions, setShowFloorOptions] = useState<boolean>(false);

  // Conectar al WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('WebSocket conectado');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'elevatorState') {
        setElevatorState(data.state);

        // Mostrar opciones de pisos si el ascensor está abierto y en el piso actual
        if (data.state.open === 1 && data.state.currentFloor === floor) {
          setShowFloorOptions(true);
        } else {
          setShowFloorOptions(false);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket desconectado');
    };

    return () => {
      ws.close();
    };
  }, [floor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Almacenar en caché (simulación)
    localStorage.setItem('floor', floor.toString());
    localStorage.setItem('direction', direction);

    // Enviar la petición POST al backend
    try {
      const response = await axios.post('http://localhost:3001/api/floor', {
        floor,
        direction,
      });
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al enviar la petición:', error);
    }
  };

  const handleSelectDestinationFloor = (destinationFloor: number) => {
    console.log(`Piso seleccionado: ${destinationFloor}`);
    // Aquí puedes enviar una petición al backend para mover el ascensor al piso seleccionado
  };

  return (
    <div className="floor-request">
      <h1>Solicitud de Ascensor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Piso Actual:
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              min="0"
              max="10"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Dirección:
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as 'up' | 'down')}
              required
            >
              <option value="up">Subir</option>
              <option value="down">Bajar</option>
            </select>
          </label>
        </div>
        <button type="submit">Solicitar Ascensor</button>
      </form>

      {/* Estado del Ascensor */}
      <div className="elevator-status">
        <h2>Estado del Ascensor</h2>
        <p>Piso Actual: {elevatorState.currentFloor}</p>
        <p>Estado: {elevatorState.state === 0 ? 'Detenido' : 'En movimiento'}</p>
        <p>Dirección: {elevatorState.direction}</p>
        <p>Puerta: {elevatorState.open === 1 ? 'Abierta' : 'Cerrada'}</p>
      </div>

      {/* Opciones de pisos */}
      {showFloorOptions && (
        <div className="floor-options">
          <h2>Seleccione un piso de destino:</h2>
          <div className="button-grid">
            {direction === 'up'
              ? Array.from({ length: 10 - floor }, (_, i) => floor + i + 1).map((f) => (
                  <button key={f} onClick={() => handleSelectDestinationFloor(f)}>
                    {f}
                  </button>
                ))
              : Array.from({ length: floor }, (_, i) => floor - i - 1).map((f) => (
                  <button key={f} onClick={() => handleSelectDestinationFloor(f)}>
                    {f}
                  </button>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorRequest;