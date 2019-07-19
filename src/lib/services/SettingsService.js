export default class SettingsService {
    constructor() {
        this.settings = require('../../settings/' + this.ENVIRONMENT + '.js')
    }

    get ENVIRONMENT() {
        if (process && process.env && process.env.NODE_ENV) return process.env.NODE_ENV;
        return 'development';
    }

    VALUE(name) {
        return this.settings[name];
    }
}