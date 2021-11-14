import React, { Component } from 'react'
// import Server from '../../services/server.js'
import Answer from './answerFromSerwer'
import Data from './date'
import FilterMenu from './filterMenu'

class App extends Component {
  render() {
    return (
      <div>
        <Data />
        <FilterMenu />
        <Answer />
      </div>
    )
  }
}
export default App
