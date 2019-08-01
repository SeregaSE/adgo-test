import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1/"
});

export const API = {
    getPlatforms() {
        return instance.get('platforms');
    },
    getOS() {
        return instance.get('operating-systems');
    },
    getBrowsers() {
        return instance.get('browsers');
    },
    getGroups() {
        return instance.get('groups');
    },
    getData(from, to, groupBy, platform = 1, browsers = [1], operatingSystems = [1], limit = 5, offset = 0) {
        return instance.get(`statistics?groupBy=${groupBy}&from=${from}&to=${to}&limit=${limit}&browsers=${browsers}&platform=${platform}&operatingSystems=${operatingSystems}&offset=${offset}`);
    }
};