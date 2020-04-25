import { GroupBy } from '../models'
import { Moment } from 'moment'

export type APIResponse<T> = Promise<{ data: T }>

export interface Platform {
  label: string,
  value: number
}
export type Platforms = Array<Platform>

export interface Browser {
  label: string,
  value: number,
  platform: number
}
export type Browsers = Array<Browser>

export interface OperatingSystem {
  label: string,
  value: number,
  platform: number
}
export type OperatingSystems = Array<OperatingSystem>

export interface Group {
  label: string,
  value: GroupBy
}
export type Groups = Array<Group>

export type Clicks = number
export type Impressions = number

export interface GeneralStatistic {
  impressions: Impressions,
  clicks: Clicks,
  money: number
}

export interface Statistic extends GeneralStatistic {
  [GroupBy.Browser]?: string,
  [GroupBy.Day]?: string,
  [GroupBy.OperatingSystem]?: string
  [GroupBy.Platform]?: string
}

export interface StatisticsResponse {
  count: number,
  rows: Array<Statistic>,
  total: GeneralStatistic
}

export type BrowsersFilterState = Array<number>
export type OSFilterState = Array<number>

export interface FilterState {
  fromDate: Date,
  toDate: Date,
  groupBy: GroupBy,
  platform: number,
  operatingSystems: OSFilterState,
  browsers: BrowsersFilterState,
  limit: number,
  offset: number
}
