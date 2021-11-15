import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
class Data extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      inputToValue: '',
    }
    // this.updateInputValue = this.updateInputValue.bind(this)
  }
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    })
  }
  updateInputToValue(e) {
    this.setState({
      inputToValue: e.target.value,
    })
  }
  stringToDate(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase()
    let formatItems = formatLowerCase.split(_delimiter)
    let dateItems = _date.split(_delimiter)
    let monthIndex = formatItems.indexOf('mm')
    let dayIndex = formatItems.indexOf('dd')
    let yearIndex = formatItems.indexOf('yyyy')
    let year = parseInt(dateItems[yearIndex])

    if (year < 100) {
      year += 2000
    }
    let month = parseInt(dateItems[monthIndex])
    month -= 1
    let formatedDate = new Date(year, month, dateItems[dayIndex])
    return formatedDate
  }
  render() {
    const { inputValue, inputToValue } = this.state
    return (
      <Form>
        <FormGroup>
          <Label for="exampleDate">From</Label>
          <Input
            id="exampleDate1"
            name="date"
            placeholder="date placeholder"
            type="date"
            onChange={(e) => this.updateInputValue(e)}
            value={this.stringToDate(inputValue, 'mm-dd-yyyy', '-')}
          />

          <Label for="exampleDate">To</Label>
          <Input
            id="exampleDate2"
            name="date"
            placeholder="date placeholder"
            type="date"
            value={this.stringToDate(inputToValue, 'mm-dd-yyyy', '-')}
            onChange={(e) => {
              this.updateInputToValue(e)
            }}
          />
        </FormGroup>
      </Form>
    )
  }
}
export default Data
