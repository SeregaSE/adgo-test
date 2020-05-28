import { SearchParams, ListItem } from '../../api/v1/statistics/interfaces'
import { Action, AppState } from '../types'
import {
    CHANGE_QUERY,
    SET_FILTER_LIST,
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
