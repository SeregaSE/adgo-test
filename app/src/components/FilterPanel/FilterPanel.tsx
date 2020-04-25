import * as React from 'react'
import InputDate from './InputDate'
import InputGroupBy from './InputGroupBy'
import InputBrowser from './InputBrowser'
import InputOperatingSystem from './InputOperatingSystem'
import InputPlatform from './InputPlatform'
import { InputGroup } from './styled'

const FilterPanel = () => {
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
