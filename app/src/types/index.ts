import { GroupBy, PlatformLabel, PlatformValue } from '../models'

export type APIResponse<T> = Promise<{ data: T }>

export interface Platform {
  label: PlatformLabel,
  value: PlatformValue
}
export type Platforms = Array<Platform>

export interface Browser {
  label: string,
  value: number,
  platform: PlatformValue
}
export type Browsers = Array<Browser>

export interface OperatingSystem {
  label: string,
  value: number,
  platform: PlatformValue
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
  [GroupBy.Platform]?: PlatformLabel
}

export interface StatisticsResponse {
  count: number,
  rows: Array<Statistic>,
  total: GeneralStatistic
}

export interface FilterState {
  fromDate: Date,
  toDate: Date,
  groupBy: GroupBy,
  platform: number,
  operatingSystem: number,
  browser: number,
}
