import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Server from '../../services/server.js'
import FilterMenu from './filterMenu.js'

class Answer extends Component {
  constructor() {
    super()
    this.server = new Server()
    this.state = {
      browsers: [],
      platform: [],
      os: [],
      groups: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/browsers')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          browsers: result,
        })
      })
    fetch('http://localhost:3000/api/v1/platforms')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          platform: result,
        })
      })
    fetch('http://localhost:3000/api/v1/operating-systems')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          os: result,
        })
      })
    fetch('http://localhost:3000/api/v1/groups')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          groups: result,
        })
      })
  }

  render() {
    const { browsers, platform, os, groups } = this.state
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>день</th>
              <th>количество показов</th>
              <th>клики</th>
              <th>деньги</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Браузеры</td>
              {browsers.map((i) => (
                <td>{i.label}</td>
                // <td>{i.value}</td>
              ))}
            </tr>
            {/* <tr>
              <td>value.browser</td>
              {browsers.map((i) => (
                <td>{i.value}</td>
              ))}
            </tr> */}
            <tr>
              <td>platform</td>
              {platform.map((i) => (
                <td>{i.label}</td>
              ))}
            </tr>
            <tr>
              <td>os</td>
              {os.map((i) => (
                <td>{i.label}</td>
              ))}
            </tr>
            <tr>
              <td>groups</td>
              {groups.map((i) => (
                <td>{i.label}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Answer
