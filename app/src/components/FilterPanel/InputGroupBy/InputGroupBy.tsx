import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import GroupsContext from '../../../context/Groups/GroupsContext'
import FilterContext from '../../../context/Filter/FilterContext'
import { useFetch } from '../../../hooks/useFetch'
import { requestGroups } from '../../../api'
import { FilterField, GroupBy } from '../../../models'
import { Groups } from '../../../types'

const InputGroupBy = () => {
  const {setFilterFields, groupBy} = React.useContext(FilterContext)
  const {setGroups} = React.useContext(GroupsContext)
  const {doFetch, response} = useFetch()

  React.useEffect(() => {
    response
      ? setGroups(response)
      : doFetch(requestGroups())
  }, [response, doFetch, setGroups])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const _groupBy = event.target.value as GroupBy
    setFilterFields({groupBy: _groupBy})
  }

  const groups = response as Groups
  if (!groups) return null

  return (
    <FormControl>
      <InputLabel id={FilterField.GroupBy}>
        Group by
      </InputLabel>
      <Select
        labelId={FilterField.GroupBy}
        id={FilterField.GroupBy}
        value={groupBy}
        onChange={handleChange}
      >
        {groups.map(group =>
          <MenuItem
            value={group.value}
            key={group.value}
          >
            {group.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default InputGroupBy
