import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FilterContext from '../../../context/Filter/FilterContext'
import Input from '@material-ui/core/Input'
import { useFetch } from '../../../hooks/useFetch'
import { filterResponseByPlatform } from '../../../utils'
import { requestBrowsers } from '../../../api'
import { FilterField } from '../../../models'
import { Browsers, BrowsersFilterState } from '../../../types'

const InputBrowser = () => {
  const {setFilterFields, browsers, platform} = React.useContext(FilterContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    if (response) return
    doFetch(requestBrowsers())
  }, [response, doFetch])

  const handleChangeBrowser = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as BrowsersFilterState
    setFilterFields({browsers: values})
  }

  if (!response) return null

  const _browsers = filterResponseByPlatform(platform, response as Browsers)

  return (
    <FormControl>
      <InputLabel id={FilterField.Browser}>
        Browser
      </InputLabel>
      <Select
        labelId={FilterField.Browser}
        id={FilterField.Browser}
        value={browsers}
        onChange={handleChangeBrowser}
        multiple
        input={<Input/>}
      >
        {_browsers.map(_browser =>
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
