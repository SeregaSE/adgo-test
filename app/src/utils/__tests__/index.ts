import { generateSearchParamsQuery, getConversions, filterResponseByPlatform } from '../'
import { FilterState } from '../../types'
import { FilterField, GroupBy } from '../../models'
import { response, responseFilteredByPlatformOne } from '../__mocks__'

describe('utils: generateSearchParamsQuery', () => {
  test('search query with only required fields', () => {
    const filterState: FilterState = {
      groupBy: GroupBy.Platform,
      platform: 0,
      operatingSystems: [],
      fromDate: new Date(2020, 4, 25),
      toDate: new Date(2020, 1, 1),
      offset: 0,
      limit: 5,
      browsers: []
    }

    expect(generateSearchParamsQuery(filterState)).toEqual(
      `${FilterField.GroupBy}=platform&` +
      `${FilterField.FromDate}=2020-05-25&` +
      `${FilterField.ToDate}=2020-02-01&` +
      `${FilterField.Limit}=5&${FilterField.Offset}=0`
    )
  })

  test('search query with all fields', () => {
    const filterState: FilterState = {
      groupBy: GroupBy.Platform,
      platform: 1,
      operatingSystems: [2, 1],
      fromDate: new Date(2020, 4, 25),
      toDate: new Date(2020, 1, 1),
      offset: 0,
      limit: 5,
      browsers: [1, 2]
    }

    expect(generateSearchParamsQuery(filterState)).toEqual(
      `${FilterField.GroupBy}=platform&` +
      `${FilterField.FromDate}=2020-05-25&` +
      `${FilterField.ToDate}=2020-02-01&` +
      `${FilterField.Platform}=1&` +
      `${FilterField.Browser}=1&` +
      `${FilterField.Browser}=2&` +
      `${FilterField.OperatingSystems}=2&${FilterField.OperatingSystems}=1&${FilterField.Limit}=5&${FilterField.Offset}=0`
    )
  })
})

describe('utils: getConversions', () => {
  test('int arguments', () => {
    expect(getConversions(15, 3)).toEqual(5)
  })

  test('zero arguments', () => {
    expect(getConversions(0, 0)).toEqual(0)
  })
})

describe('utils: filterResponseByPlatform', () => {
  test('platform is zero', () => {
    expect(filterResponseByPlatform(0, response)).toEqual(response)
  })

  test('platform is existing value', () => {
    expect(filterResponseByPlatform(1, response)).toEqual(responseFilteredByPlatformOne)
  })

  test('platform is nonexistent value', () => {
    expect(filterResponseByPlatform(1, response)).toEqual(responseFilteredByPlatformOne)
  })
})
