export interface DataRow {
  day?: string
  platform?: string
  impressions: number
  clicks: number
  money: number
}

export interface Query {
  groupBy: string
  from: string
  to: string
  limit: number
  offset: number
  platform: string
  browsers: string | string[]
  operatingSystems: string | string[]
}

export interface SelectListItem {
  label: string
  value: number | string
  platform?: number
}

export interface Statistics {
  count: number
  rows: DataRow[]
  total: number
}

export interface Store {
  data: DataRow[]
  query: Query
}

export interface Action<T> {
  type: string
  payload: T
}
