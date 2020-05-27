import { Action, Query } from '../types'
import { CHANGE_QUERY } from '../constants'

type QueryParam = { [K in keyof Query]?: Query[K] }

export function changeQuery(queryParam: QueryParam): Action<QueryParam> {
    return {
        type: CHANGE_QUERY,
        payload: queryParam
    }
}
