import React from 'react'
import FilterProvider from '../../context/Filter/FilterProvider'
import FilterPanel from '../../components/FilterPanel'
import Statistics from '../../components/Statistics'
import { Content } from './styled'
import GroupsProvider from '../../context/Groups/GroupsProvider'

const App = () => {
  return (
    <FilterProvider>
      <GroupsProvider>
        <Content>
          <FilterPanel/>
          <Statistics/>
        </Content>
      </GroupsProvider>
    </FilterProvider>
  )
}

export default App
