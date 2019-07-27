import BaseAxiosService from './BaseAxiosService';

export default class SpotService extends BaseAxiosService {
    getAllSpots() {
        return this.axios.get(this.decache(this.settings.VALUE('SPOT_URL')))
    }

    getSpotById(id) {
        return this.axios.get(this.decache(`${this.settings.VALUE('SPOT_URL')}/${id}`));
    }

    createSpot(spot) {
        return this.axios.post(this.settings.VALUE('SPOT_URL'), spot);
    }

    updateSpot(spot) {
        return this.axios.put(
            `${this.settings.VALUE('SPOT_URL')}/${spot.id}`, spot);
    }

    removeSpot(id) {
        return this.axios.delete(`${this.settings.VALUE('SPOT_URL')}/${id}`);
    }
}