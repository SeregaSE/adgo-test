import * as React from 'react'
import { Groups } from '../../types'

interface ContextState {
  groups?: Groups,
  setGroups: (groups: Groups) => void
}

export const initialState = {
  setGroups: () => {}
}

const GroupsContext = React.createContext<ContextState>(initialState)
// TODO: multiple select
// TODO: pagination
// TODO: tests
// TODO: platform does not required
export default GroupsContext
