import { AppState, Action } from '../types'
import { CHANGE_QUERY } from '../constants'

const initialState: AppState = {
    data: [],
    query: {
        groupBy: 'day',
        from: '2019-08-09',
        to: '2019-08-10',
        limit: 10,
        offset: 0,
        platform: 'Desktop',
        browsers: 'Chrome',
        operatingSystems: 'Windows',
    },
    groups: [],
    browsers: [],
    operatingSystems: []
}


export default function (state: AppState = initialState, action: Action): AppState {
    switch(action.type) {
        case CHANGE_QUERY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
