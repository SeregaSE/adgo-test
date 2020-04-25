import * as React from 'react'
import FilterContext from '../../context/Filter/FilterContext'
import { NOT_SELECTED_VALUE } from '../../constants'
import InputDate from './InputDate'
import InputGroupBy from './InputGroupBy'
import InputBrowser from './InputBrowser'
import InputOperatingSystem from './InputOperatingSystem'
import InputPlatform from './InputPlatform'
import { InputGroup } from './styled'

const FilterPanel = () => {
  const {setFilterFields, platform} = React.useContext(FilterContext)

  React.useEffect(
    () => {
      setFilterFields({
        operatingSystem: NOT_SELECTED_VALUE,
        browser: NOT_SELECTED_VALUE
      })
    },
    [platform, setFilterFields]
  )

  return (
    <InputGroup>
      <InputDate/>
      <InputGroupBy/>
      <InputPlatform/>
      <InputOperatingSystem/>
      <InputBrowser/>
    </InputGroup>
  )
}

export default FilterPanel
