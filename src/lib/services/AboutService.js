import Axios from 'axios';
import SettingsService from './SettingsService';

export default class AboutService {
    static getAbout() {
        return Axios
            .get(new SettingsService().VALUE('ABOUT_URL'));
    }
}