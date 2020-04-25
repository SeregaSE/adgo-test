import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FilterContext from '../../../context/Filter/FilterContext'
import { useFetch } from '../../../hooks/useFetch'
import { requestBrowsers } from '../../../api'
import { FilterField } from '../../../models'
import { Browsers } from '../../../types'
import { NOT_SELECTED_VALUE } from '../../../constants'

const InputBrowser = () => {
  const {setFilterFields, browser, platform} = React.useContext(FilterContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    if (response) return
    doFetch(requestBrowsers())
  }, [response, doFetch])

  const handleChangeBrowser = (event: React.ChangeEvent<{ value: unknown }>) => {
    const _browser = event.target.value as number
    setFilterFields({browser: _browser})
  }

  if (!response) return null
  const browsers = (response as Browsers).filter(_browser => _browser.platform === platform)

  return (
    <FormControl>
      <InputLabel id={FilterField.Browser}>
        Browser
      </InputLabel>
      <Select
        labelId={FilterField.Browser}
        id={FilterField.Browser}
        value={browser}
        onChange={handleChangeBrowser}
      >
        <MenuItem value={NOT_SELECTED_VALUE}>
          <em>None</em>
        </MenuItem>
        {browsers.map(_browser =>
          <MenuItem
            value={_browser.value}
            key={_browser.value}
          >
            {_browser.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default InputBrowser
