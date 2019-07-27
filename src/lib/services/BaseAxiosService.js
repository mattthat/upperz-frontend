import Axios from 'axios';
import SettingsService from './SettingsService';

export default class BaseAxiosService {
    constructor() {
        this.axios = Axios;
        this.settings = new SettingsService();
    }

    decache(url) {
        return `${url}?_=${new Date().getTime()}`;
    }
}