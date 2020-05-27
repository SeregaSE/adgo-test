import { Store, Action } from '../types'
import { CHANGE_QUERY } from '../constants'

const initialState: Store = {
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
    }
}


export default function (state: Store = initialState, action: Action): Store {
    switch(action.type) {
        case CHANGE_QUERY:
            return {
                ...state,
                ...action.payload
            }

    }
}
