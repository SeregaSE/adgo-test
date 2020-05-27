import { ApiService } from '../../ApiService'
import { SearchParams, ListItem, Statistics } from './interfaces'

export class StatisticsService extends ApiService {

    getPlatformsList() {
        return this.http
            .get<ListItem[]>(`${this.url}/platforms`)
            .then(response => response.data)
    }

    getBrowsersList() {
        return this.http
            .get<ListItem[]>(`${this.url}/browsers`)
            .then(response => response.data)
    }

    getOperatingSystemsList() {
        return this.http
            .get<ListItem[]>(`${this.url}/operating-systems`)
            .then(response => response.data)
    }

    getGroupsList() {
        return this.http
            .get<ListItem[]>(`${this.url}/groups`)
            .then(response => response.data)
    }

    getStatistics(params?: SearchParams) {
        return this.http
            .get<Statistics>(`${this.url}/statistics`, { params })
            .then(response => response.data)
    }
}