import { AppState, Action } from '../types'
import {
    CHANGE_QUERY,
    SET_FILTER_LIST,
    SET_STATISTICS_DATA
} from '../constants'

const initialState: AppState = {
    data: [],
    query: {
        groupBy: 'day',
        from: '2019-08-09',
        to: '2019-08-10',
        limit: 10,
        offset: 0,
        platform: '1',
        browsers: '1',
        operatingSystems: '1',
    },
    groups: [],
    browsers: [],
    platforms: [],
    operatingSystems: []
}


export default function (state: AppState = initialState, action: Action): AppState {
    switch(action.type) {
        case CHANGE_QUERY:
            return {
                ...state,
                query: {
                    ...state.query,
                    ...action.payload
                }
            }
        case SET_FILTER_LIST:
            return {
                ...state,
                ...action.payload
            }
        case SET_STATISTICS_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}
