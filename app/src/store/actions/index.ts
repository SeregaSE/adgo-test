import { SearchParams } from '../../api/v1/statistics/interfaces'
import { Action } from '../types'
import { CHANGE_QUERY } from '../constants'

type QueryParam = { [K in keyof SearchParams]?: SearchParams[K] }

export function changeQuery(queryParam: QueryParam): Action<QueryParam> {
    return {
        type: CHANGE_QUERY,
        payload: queryParam
    }
}
