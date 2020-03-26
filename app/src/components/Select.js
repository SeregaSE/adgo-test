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

  onChange = (value) => {
    this.props.onChange(this.props.type, value)
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
            this.onChange(options[0].value)
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
          allowClear
          value={this.props.value}
          loading={this.state.loading}
          disabled={this.props.platforms === '' ? true : false}
          mode={this.props.multy ? 'multiple' : ''}
          placeholder={`Select ${this.props.title}`} 
          className="select"
          onChange={this.onChange}
        >
          {this.state.options
            .filter(option => {
              if(!option.platform) return true
              if(!this.props.platforms) return true

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