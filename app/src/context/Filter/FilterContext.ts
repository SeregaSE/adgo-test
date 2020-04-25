import * as React from 'react'
import { NOT_SELECTED_VALUE, ONE_WEEK_IN_MS, PAGINATION_LIMIT } from '../../constants'
import { GroupBy } from '../../models'
import { FilterState } from '../../types'

interface ContextState extends FilterState {
  setFilterFields: (filterFields: Partial<FilterState>) => void
}

export const initialFilterState = {
  fromDate: new Date(Date.now()),
  toDate: new Date(Date.now() + ONE_WEEK_IN_MS),
  groupBy: GroupBy.Platform,
  platform: NOT_SELECTED_VALUE,
  operatingSystems: [],
  browsers: [],
  limit: PAGINATION_LIMIT,
  offset: 0
}

const FilterContext = React.createContext<ContextState>({
  ...initialFilterState,
  setFilterFields: () => {}
})

export default FilterContext
