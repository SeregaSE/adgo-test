import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Server from '../../services/server.js'
import FilterMenu from './filterMenu.js'

class Answer extends Component {
  constructor() {
    super()
    this.server = new Server()
    this.state = {
      statistics: [],
    }
  }

  componentDidMount() {
    fetch(
      'http://localhost:3000/api/v1/statistics?groupBy=platform&from=2019-06-01&to=2019-06-30'
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          statistics: [result],
        })
      })
  }

  render() {
    const { statistics } = this.state

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

              <td>
                {/* {statistics.map((i) =>
                  Object.values(i.rows[0]).map((item) => Object.values(item))
                )} */}
                {statistics.map((i) =>
                  Object.entries(i.rows[0]).map((item) => Object.entries(item))
                )}
              </td>
            </tr>
            <tr>
              <td>platform</td>
              <td>
                {statistics.map((i) =>
                  Object.keys(i.rows[0]).map((item) => Object.keys(item))
                )}
              </td>
            </tr>
            <tr>
              <td>os</td>
              {statistics.map((i) =>
                Object.values(i.rows[0]).map((item) => Object.values(item))
              )}
            </tr>
            <tr>
              <td>groups</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Answer
