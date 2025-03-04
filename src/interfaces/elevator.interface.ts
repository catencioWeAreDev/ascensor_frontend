interface ElevatorState {
    open: number; 
    currentFloor: number;
    state: number; 
    direction: 'up' | 'down' | 'stay';
}

export default ElevatorState;