export interface ElevatorState {
    open: number; 
    currentFloor: number; 
    state: number; 
    direction: 'stay' | 'up' | 'down';
}
  
export type Floor = number;