import axios from 'axios'
import { APIResponse, Browsers, Groups, OperatingSystems, Platforms, StatisticsResponse } from '../types'
import { ROUTE_PREFIX } from '../constants'

export const requestPlatforms = (): APIResponse<Platforms> =>
  axios.get(`${ROUTE_PREFIX}/platforms`)

export const requestBrowsers = (): APIResponse<Browsers> =>
  axios.get(`${ROUTE_PREFIX}/browsers`)

export const requestOperatingSystems = (): APIResponse<OperatingSystems> =>
  axios.get(`${ROUTE_PREFIX}/operating-systems`)

export const requestGroups = (): APIResponse<Groups> =>
  axios.get(`${ROUTE_PREFIX}/groups`)

export const requestStatistics = (searchParams: string): APIResponse<StatisticsResponse> =>
  axios.get(`${ROUTE_PREFIX}/statistics?${searchParams}`)
