import React, { Component } from 'react'
// import Server from '../../services/server.js'
import Answer from './answerFromSerwer'
import FilterMenu from './filterMenu'

class App extends Component {
  render() {
    return (
      <div>
        <FilterMenu />
        <Answer />
      </div>
    )
  }
}
export default App
