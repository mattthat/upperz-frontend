import Axios from 'axios';
import SettingsService from './SettingsService';

export default class SpotService {
    static getAllSpots() {
        return Axios
            .get(new SettingsService().VALUE('SPOT_URL') + '?t=' + new Date().getTime());
    }

    static getSpotById(id) {
        return Axios
            .get(new SettingsService().VALUE('SPOT_URL') + `/${id}`)
    }

    static createSpot(spot) {
        return Axios
            .post(new SettingsService().VALUE('SPOT_URL'), spot);
    }

    static updateSpot(spot) {
        return Axios
            .put(new SettingsService().VALUE('SPOT_URL') + `/${spot.id}`, spot);
    }

    static removeSpot(id) {
        return Axios
            .delete(new SettingsService().VALUE('SPOT_URL') + `/${id}`);
    }
}