import React from 'react'

import DatePicker from './elements/Date'
import Select from './elements/Select'

class TableSort extends React.Component {

    constructor() {
        super()
        this.setUrl = this.setUrl.bind(this)
    }

    setUrl (e) {
        let type = e.target.getAttribute("data-type")
        let value = e.target.value
        this.props.changeUrl(type, value)
        const urlState ={
            ...this.props.urlState,
            offset: 0,
            [type]: {
               url: this.props.urlState[type].url,
               value: value 
            }
        } 
        this.props.getData(urlState)
    }

    render() {
        const {groupby, platform, os, browser} = this.props.optionsGroup
        const yesterday = new Date(new Date().setDate(new Date().getDate()-1))
        const today = new Date(new Date().setDate(new Date().getDate()))
        const changeUrl = this.props.changeUrl
        const getData = this.props.getData
        const urlState = this.props.urlState
        return(
            <div className="table_sort">
                <div className="table_sort_head">
                    <div className="sort_date_from elem">
                        <span>От</span>
                        <DatePicker defaultDate={yesterday} optionType='from' changeUrl={changeUrl} getData={getData} urlState={urlState} />
                    </div>
                    <div className="sort_date_to elem">
                    <span>До</span>
                        <DatePicker defaultDate={today} optionType='to' changeUrl={changeUrl} getData={getData} urlState={urlState} />
                    </div> 
                    <div className="sort_groupby elem">
                    <span>Группировка по</span>
                        <Select onChange={this.setUrl} nameOption="Group by" data={groupby} optionType='groupby'  urlState={urlState} />
                    </div>
                </div>
                <div className="table_sort_bottom">
                    <div className="sort_platform elem">
                    <span>Выбор платформы</span>
                        <Select onChange={this.setUrl} nameOption="Platform" data={platform} optionType='platform' urlState={urlState}  />
                    </div>
                    <div className="sort_os elem">
                    <span>Выбор ОС</span>
                       <Select onChange={this.setUrl} nameOption="Operating System" data={os} optionType='os' urlState={urlState}  />
                    </div>
                    <div className="sort_browser elem">
                    <span>Выбор браузера</span>
                        <Select onChange={this.setUrl} nameOption="Browser" data={browser} optionType='browsers' urlState={urlState} />
                    </div>
                </div>
               
            </div>
        )
    }
}

export default TableSort