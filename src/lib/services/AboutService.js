import BaseAxiosService from './BaseAxiosService';

export default class AboutService extends BaseAxiosService {

    getAbout() {
        return this.axios.get(this.decache(this.settings.VALUE('ABOUT_URL')));
    }

}