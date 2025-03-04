import axios from "axios";
import constants from "../utils/constans";
import FloorState from "../interfaces/floor.interface";

class FloorService {
    readonly path: string = '/api/floor';
    readonly url: string = constants.API_URL;

    async postFloor(floorState: FloorState) {
        try {
            const response = await axios.post(`${this.url}${this.path}`, floorState);
            console.log('Respuesta del backend:', response.data);
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        }
    }

    async getFloor() {
        try {
            const response = await axios.get(`${this.url}${this.path}`);
            console.log('Respuesta del backend:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        }
    }

}

export default FloorService;