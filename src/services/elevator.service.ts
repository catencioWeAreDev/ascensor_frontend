import axios from "axios";
import constants from "../utils/constans";
import ElevatorState from "../interfaces/elevator.interface";

class ElevatorService {
    readonly path: string = '/api/ascensor';
    readonly url: string = constants.API_URL;

    async postElevator(elevatorState: ElevatorState) {
        try {
            const response = await axios.post(`${this.url}${this.path}`, elevatorState);
            console.log('Respuesta del backend:', response.data);
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        }
    }

    async getElevator() {
        try {
            const response = await axios.get(`${this.url}${this.path}`);
            console.log('Respuesta del backend:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        }
    }

}

export default ElevatorService;