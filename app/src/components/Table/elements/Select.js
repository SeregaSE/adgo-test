import React from 'react'
import {Select} from 'react-materialize'

class elemSelect extends React.Component {

    constructor() {
        super()
        this.renderOptions = this.renderOptions.bind(this)
    }

    renderOptions(data) {
        return data.map((i, n) => {
            return (
                <option key={n} value={i.value}>
                     {i.label}
                </option>
            )
        })
    }

    render() {
        const data = this.props.data
        const type = this.props.optionType
        const value = this.props.urlState[type].value
        return (
            <Select
                        onChange={this.props.onChange}
                         data-type={type}
                         options={{
                            classes: '',
                            dropdownOptions: {
                              alignment: 'left',
                              autoTrigger: true,
                              closeOnClick: true,
                              constrainWidth: true,
                              container: null,
                              coverTrigger: true,
                              hover: false,
                              inDuration: 150,
                              onCloseEnd: null,
                              onCloseStart: null,
                              onOpenEnd: null,
                              onOpenStart: null,
                              outDuration: 250
                            }
                          }}
                         value={value}
                            >   
                            <option 
                              disabled
                              value=""
                             >
                              {this.props.nameOption}
                            </option> 
                        {this.renderOptions(data)}
                        <option value="">
                            All
                            </option>                
                            </Select>
        )
        
    }
}

export default elemSelect