import React, { useState } from 'react'
import GroupsContext from './GroupsContext'
import { Groups } from '../../types'

interface Props {
  children: JSX.Element
}

const GroupsProvider: React.FC<Props> = ({children}) => {
  const setGroups = React.useCallback((groups: Groups) => {
    updateGroupsState(prevState => {
      return {...prevState, groups}
    })
  }, [])

  const groupsInitialState = {
    setGroups
  }

  const [groupsState, updateGroupsState] = useState(groupsInitialState)

  return (
    <GroupsContext.Provider value={groupsState}>
      {children}
    </GroupsContext.Provider>
  )
}

export default GroupsProvider
