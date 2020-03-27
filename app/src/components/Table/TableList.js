import React from 'react'

class TableList extends React.Component {

    constructor() {
        super()
        this.renderList = this.renderList.bind(this)
    }

    sortList() {

    }

    renderList(data) {
        return data.map((i, n) => {
            return(
            <tr key={n}>
            <td >{n + 1}</td>
            <td>{i.platform}</td>
            <td>{i.operatingSystem}</td>
            <td>{i.browser}</td>
            <td>{i.clicks}</td>
            <td>{i.money}</td>
            <td>{i.day}</td>
            </tr>
            )
        })

    }

    render() {
        const defData = this.props.defData

        return(
        <table className="highlight tableBlock">
        <thead>
          <tr>
              <th>ID</th>
              <th>Platform</th>
              <th>Operating System</th>
              <th>Browser</th>
              <th>Click</th>
              <th>Money</th>
              <th>Datetime</th>
          </tr>
        </thead>

        <tbody>
            {this.renderList(defData)}
        </tbody>
      </table>
        )
    }
}

export default TableList