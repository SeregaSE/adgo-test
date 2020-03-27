import React from 'react'
import TableList from './TableList'
import TableSort from './TableSort'
import Pagination from './elements/Pagination'

import './Table.css'

class Table extends React.Component {

    constructor() {
        super()
        this.clickPaginate=this.clickPaginate.bind(this)
    }

    componentDidMount () {
        const urlState = this.props.urlState
        this.props.getData(urlState)
        this.props.getOptionsGroup()
    }

    clickPaginate(page) {
        this.props.changePage(page - 1)
         // let offset = this.props.paginate.count * page - this.props.paginate.count
        const urlState = {
            ...this.props.urlState,
            offset: page - 1
        } 
        this.props.getData(urlState)
        
        
        console.log('page')
    }

    render() { 
        const defData = this.props.defaultData
        const optionsGroup = this.props.optionsGroup
        const changeUrl = this.props.changeUrl
        const getData = this.props.getData
        const urlState = this.props.urlState
        const paginate = this.props.paginate
        
        return(
            <div className="container">
                <div className="table">
                <TableSort optionsGroup={optionsGroup} changeUrl={changeUrl} getData={getData} urlState={urlState} />
                <TableList defData={defData} urlState={urlState} paginate={paginate} />
                <Pagination onClick={this.clickPaginate} paginate={paginate} />
                </div>
            </div>
          
        )
    }
}

export default Table