import moment from 'moment'
import { DATE_SERVER_FORMAT } from '../constants'
import { Browsers, Clicks, FilterState, Impressions, OperatingSystems } from '../types'
import { FilterField } from '../models'

export const generateSearchParamsQuery = (params: FilterState) => {
  const {
    groupBy,
    operatingSystems,
    platform,
    browsers,
    fromDate,
    toDate,
    limit,
    offset
  } = params

  const groupByQuery = `${FilterField.GroupBy}=${groupBy}`
  const fromDateQuery = `${FilterField.FromDate}=${formatDateToServer(fromDate)}`
  const toDateQuery = `${FilterField.ToDate}=${formatDateToServer(toDate)}`
  const platformQuery = platform && `${FilterField.Platform}=${platform}`
  const browserQuery = browsers.length && browsers.map(browser => `${FilterField.Browser}=${browser}`).join('&')
  const operatingSystemQuery = operatingSystems.length && operatingSystems.map(os => `${FilterField.OperatingSystems}=${os}`).join('&')
  const limitQuery = `${FilterField.Limit}=${limit}`
  const offsetQuery = `${FilterField.Offset}=${offset}`

  return [groupByQuery, fromDateQuery, toDateQuery, platformQuery, browserQuery, operatingSystemQuery, limitQuery, offsetQuery]
    .filter(_query => !!_query)
    .join('&')
}

const formatDateToServer = (date: Date) => moment(date).format(DATE_SERVER_FORMAT)

export const getConversions = (impressions: Impressions, clicks: Clicks): number =>
  clicks === 0 ? 0 : impressions / clicks

export const filterResponseByPlatform = (platform: number, response: OperatingSystems | Browsers) =>
  platform
    ? response.filter(os => os.platform === platform)
    : response
