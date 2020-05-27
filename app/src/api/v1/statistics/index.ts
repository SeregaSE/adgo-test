import { ApiService } from '../../ApiService'
import { SearchParams } from './interfaces'

export class StatisticsService extends ApiService {

    getPlatformsList() {
        return this.http
            .get(`${this.url}/platforms`)
            .then(response => response)
    }

    getBrowsersList() {
        return this.http
            .get(`${this.url}/browsers`)
            .then(response => response)
    }

    getOperatingSystemsList() {
        return this.http
            .get(`${this.url}/operating-systems`)
            .then(response => response)
    }

    getGroupsList() {
        return this.http
            .get(`${this.url}/groups`)
            .then(response => response)
    }

    getStatistics(params?: SearchParams) {
        return this.http
            .get(`${this.url}/statistics`, { params })
            .then(response => response)
    }
}
