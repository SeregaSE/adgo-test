import moment from 'moment'
import { NOT_SELECTED_VALUE } from '../constants'
import { Browsers, Clicks, FilterState, Impressions, OperatingSystems } from '../types'
import { FilterField, PlatformValue } from '../models'

export const generateSearchParamsQuery = (params: FilterState) => {
  const groupByQuery = `${FilterField.GroupBy}=${params.groupBy}`
  const fromDateQuery = `${FilterField.FromDate}=${formatDateToServer(params.fromDate)}`
  const toDateQuery = `${FilterField.ToDate}=${formatDateToServer(params.toDate)}`
  const platformQuery = params.platform && `${FilterField.Platform}=${params.platform}`
  const browserQuery = params.browser && `${FilterField.Browser}=${params.browser}`
  const operatingSystemQuery = params.operatingSystem && `${FilterField.OperatingSystems}=${params.operatingSystem}`

  return [groupByQuery, fromDateQuery, toDateQuery, platformQuery, browserQuery, operatingSystemQuery]
    .filter(_query => !!_query)
    .join('&')
}

const formatDateToServer = (date: Date) => moment(date).format('YYYY-MM-DD')

export const getConversions = (impressions: Impressions, clicks: Clicks): number =>
  clicks === 0 ? 0 : impressions / clicks

export const filterResponseByPlatform = (platform: PlatformValue | typeof NOT_SELECTED_VALUE, response: OperatingSystems | Browsers) =>
  platform
    ? response.filter(os => os.platform === platform)
    : response
