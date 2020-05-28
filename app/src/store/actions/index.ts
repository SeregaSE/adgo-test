import { SearchParams, ListItem, Statistics } from '../../api/v1/statistics/interfaces'
import { Action, AppState } from '../types'
import {
    CHANGE_QUERY,
    SET_FILTER_LIST, SET_STATISTICS_DATA,
} from '../constants'


type QueryParam = { [K in keyof SearchParams]?: SearchParams[K] }
type FilterKey = keyof Omit<AppState, 'data' | 'query'>

export function changeQuery(queryParam: QueryParam): Action<QueryParam> {
    return {
        type: CHANGE_QUERY,
        payload: queryParam
    }
}

export function setFilterList(list: ListItem[], key: FilterKey): Action<{ [key in FilterKey]?: ListItem[] }> {
    return {
        type: SET_FILTER_LIST,
        payload: {
            [key]: list
        }
    }
}

export function setStatisticsData(statistics: Statistics): Action<Statistics> {
    return {
        type: SET_STATISTICS_DATA,
        payload: statistics
    }
}
