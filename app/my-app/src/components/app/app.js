import React, { Component } from 'react'

import Answer from './answerFromSerwer'
import Data from './date'
import FilterMenu from './filterMenu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      inputToValue: '',
      isOpenBrowser: false,
      isOpenOs: false,
      isOpenPlatform: false,
      isOpenGroup: false,
      browsers: [],
      platform: [],
      os: [],
      groups: [],
      statistics: [],
    }
  }

  render() {
    const state = this.state
    return (
      <div>
        <Data />
        <FilterMenu />
        <Answer state={state} />
      </div>
    )
  }
}
export default App
