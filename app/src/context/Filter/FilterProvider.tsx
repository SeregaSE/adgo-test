import React, { useState } from 'react'
import FilterContext, { initialFilterState } from './FilterContext'

interface Props {
  children: JSX.Element
}

const FilterProvider: React.FC<Props> = ({children}) => {
  const setFilterFields = React.useCallback((filterFields: object) => {
    updateFilterState(prevState => {
      return {...prevState, ...filterFields}
    })
  }, [])

  const filterInitialState = {
    ...initialFilterState,
    setFilterFields
  }

  const [filterState, updateFilterState] = useState(filterInitialState)

  React.useEffect(() => {
    setFilterFields({offset: 0})
  }, [filterState.browsers, filterState.fromDate, filterState.groupBy, filterState.operatingSystems, filterState.platform, setFilterFields])

  React.useEffect(
    () => {
      setFilterFields({
        operatingSystems: [],
        browsers: []
      })
    },
    [filterState.platform, filterState.setFilterFields, setFilterFields]
  )
  //TODO search pagination set state
  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
