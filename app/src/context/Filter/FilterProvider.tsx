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

  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
