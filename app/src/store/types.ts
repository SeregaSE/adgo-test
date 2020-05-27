import { DataRow, SearchParams } from '../api/v1/statistics/interfaces'

export interface Store {
  data: DataRow[]
  query: SearchParams
}

export interface Action<T = any> {
  type: string
  payload: T
}
