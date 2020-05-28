import { DataRow, SearchParams, ListItem } from '../api/v1/statistics/interfaces'

export interface AppState {
  data: DataRow[]
  query: SearchParams
  groups: ListItem[]
  platforms: ListItem[]
  browsers: ListItem[]
  operatingSystems: ListItem[]
}

export interface Action<T = any> {
  type: string
  payload: T
}
