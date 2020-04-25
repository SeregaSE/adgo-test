import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FilterContext from '../../../context/Filter/FilterContext'
import { FilterField, PlatformValue } from '../../../models'
import { useFetch } from '../../../hooks/useFetch'
import { requestPlatforms } from '../../../api'
import { Platforms } from '../../../types'
import { NOT_SELECTED_VALUE } from '../../../constants'

const InputPlatform = () => {
  const {setFilterFields, platform} = React.useContext(FilterContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    if (response) return
    doFetch(requestPlatforms())
  }, [response, doFetch])

  const handleChangePlatform = (event: React.ChangeEvent<{value: unknown}>) => {
    const _platform = event.target.value as PlatformValue
    setFilterFields({platform: _platform})
  }

  const platforms = response as Platforms
  if (!platforms) return null

  return (
    <FormControl>
      <InputLabel id={FilterField.Platform}>
        platform
      </InputLabel>
      <Select
        labelId={FilterField.Platform}
        id={FilterField.Platform}
        value={platform}
        onChange={handleChangePlatform}
      >
        <MenuItem value={NOT_SELECTED_VALUE}>
          <em>None</em>
        </MenuItem>
        {platforms.map(_platform =>
          <MenuItem
            value={_platform.value}
            key={_platform.value}
          >
            {_platform.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default InputPlatform
