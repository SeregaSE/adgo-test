import axios from 'axios'
import { APIResponse, Browsers, Groups, OperatingSystems, Platforms, StatisticsResponse } from '../types'
import { routePrefix } from '../constants'

export const requestPlatforms = (): APIResponse<Platforms> =>
  axios.get(`${routePrefix}/platforms`)

export const requestBrowsers = (): APIResponse<Browsers> =>
  axios.get(`${routePrefix}/browsers`)

export const requestOperatingSystems = (): APIResponse<OperatingSystems> =>
  axios.get(`${routePrefix}/operating-systems`)

export const requestGroups = (): APIResponse<Groups> =>
  axios.get(`${routePrefix}/groups`)

export const requestStatistics = (searchParams: string): APIResponse<StatisticsResponse> =>
  axios.get(`${routePrefix}/statistics?${searchParams}`)
