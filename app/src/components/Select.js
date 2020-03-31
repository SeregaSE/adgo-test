import React from 'react';
import { Select, notification } from 'antd';
import { baseUrl } from '../config'

const { Option } = Select;

export class SelectComponent extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      options: [],
      loading: false,
    }
  }

  onChange = (value, option) => {
    this.props.onChange(this.props.type, option)
  }

  componentDidMount() {
    this.setState({loading: true})
    
    fetch(`${baseUrl}/${this.props.type}`)
      .then((response) => {
        this.setState({loading: false})

        if(response.status === 200)
          return response.json()
          
        throw new Error('')
      })
      .then(
        options => {
          this.setState({options})
          if(this.props.required && options[0])
            this.onChange('', options[0])
        }, 
        () => {
          notification.error({
            message: 'Error',
            description: `Collection "${this.props.title}" not found`,
            duration: 3,
          })
        }
      )
  }

  render() {
    return (
      <div className="filter-row-element">
        <p>{this.props.title}</p>
        <Select 
          allowClear={!this.props.unClear}
          value={this.props.value}
          loading={this.state.loading}
          disabled={this.props.hasOwnProperty('platforms') && !this.props.platforms ? true : false}
          mode={this.props.multy ? 'multiple' : ''}
          placeholder={`Select ${this.props.title}`} 
          className="select"
          filterOption={false}
          onChange={this.onChange}
        >
          {this.state.options
            .filter(option => {
              if(!option.platform) return true
              if(this.props.platforms === undefined) return true

              return option.platform === this.props.platforms
            })
            .map((option, index) => (
              <Option key={index} value={option.value}>{option.label}</Option>
            ))
          }
        </Select>
      </div>
    )
  }
}