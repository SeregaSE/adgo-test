import { DataRow, SearchParams } from '../api/v1/statistics/interfaces'


export interface Store {
  data: DataRow[]
  query: SearchParams
}

export interface Action<T> {
  type: string
  payload: T
}
