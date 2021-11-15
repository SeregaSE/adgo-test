import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Server from '../../services/server.js'

class Answer extends Component {
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

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/statistics?groupBy=platform&from=2019-06-01&to=2019-06-01`
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
              <td>общие данные</td>

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
              <td>просмотры</td>
              <td>
                {statistics.map((i) =>
                  Object.keys(i.rows[0]).map((item) => Object.keys(item))
                )}
              </td>
            </tr>
            <tr>
              <td>платформа</td>
              <td>
                {statistics.map((i) =>
                  Object.values(i.rows[0]).map((item) => Object.values(item))
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Answer
