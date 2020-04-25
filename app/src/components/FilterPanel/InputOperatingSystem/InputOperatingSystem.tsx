import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { Input } from '@material-ui/core'
import FilterContext from '../../../context/Filter/FilterContext'
import { filterResponseByPlatform } from '../../../utils'
import { useFetch } from '../../../hooks/useFetch'
import { requestOperatingSystems } from '../../../api'
import { FilterField } from '../../../models'
import { OperatingSystems, OSFilterState } from '../../../types'

const InputOperatingSystem = () => {
  const {setFilterFields, operatingSystems, platform} = React.useContext(FilterContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    if (response) return
    doFetch(requestOperatingSystems())
  }, [response, doFetch])

  const handleChangeOperatingSystem = (event: React.ChangeEvent<{ value: unknown }>) => {
    const _operatingSystem = event.target.value as OSFilterState
    setFilterFields({operatingSystems: _operatingSystem})
  }

  if (!response) return null

  const _operatingSystems = filterResponseByPlatform(platform, response as OperatingSystems)

  return (
    <FormControl>
      <InputLabel id={FilterField.OperatingSystems}>
        Operating Systems
      </InputLabel>
      <Select
        labelId={FilterField.OperatingSystems}
        id={FilterField.OperatingSystems}
        value={operatingSystems}
        multiple
        input={<Input/>}
        onChange={handleChangeOperatingSystem}
      >
        {_operatingSystems.map(_operatingSystem =>
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
