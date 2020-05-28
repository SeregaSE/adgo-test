import { SearchParams, ListItem } from '../../api/v1/statistics/interfaces'
import { Action, AppState } from '../types'
import {
    CHANGE_QUERY,
    SET_FILTER_LIST,
} from '../constants'


type QueryParam = { [K in keyof SearchParams]?: SearchParams[K] }

export function changeQuery(queryParam: QueryParam): Action<QueryParam> {
    return {
        type: CHANGE_QUERY,
        payload: queryParam
    }
}

export function setFilterList(list: ListItem[], key: keyof Omit<AppState, 'data' | 'query'>): Action {
    return {
        type: SET_FILTER_LIST,
        payload: {
            [key]: list
        }
    }
}
