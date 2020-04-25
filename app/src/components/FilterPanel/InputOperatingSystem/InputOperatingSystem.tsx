import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FilterContext from '../../../context/Filter/FilterContext'
import { FilterField } from '../../../models'
import { useFetch } from '../../../hooks/useFetch'
import { requestOperatingSystems } from '../../../api'
import { OperatingSystems } from '../../../types'
import { NOT_SELECTED_VALUE } from '../../../constants'

const InputOperatingSystem = () => {
  const {setFilterFields, operatingSystem, platform} = React.useContext(FilterContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    if (response) return
    doFetch(requestOperatingSystems())
  }, [response, doFetch])

  const handleChangeOperatingSystem = (event: React.ChangeEvent<{ value: unknown }>) => {
    const _operatingSystem = event.target.value as number
    setFilterFields({operatingSystem: _operatingSystem})
  }

  if (!response) return null

  const operatingSystems = (response as OperatingSystems).filter(os => os.platform === platform)

  return (
    <FormControl>
      <InputLabel id={FilterField.OperatingSystems}>
        operating-systems
      </InputLabel>
      <Select
        labelId={FilterField.OperatingSystems}
        id={FilterField.OperatingSystems}
        value={operatingSystem}
        onChange={handleChangeOperatingSystem}
      >
        <MenuItem value={NOT_SELECTED_VALUE}>
          <em>None</em>
        </MenuItem>
        {operatingSystems.map(_operatingSystem =>
          <MenuItem
            value={_operatingSystem.value}
            key={_operatingSystem.value}
          >
            {_operatingSystem.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default InputOperatingSystem
