import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
class Data extends Component {
  constructor() {
    super()
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
  render() {
    const inputValue = this.state
    return (
      <Form>
        <FormGroup>
          <Label for="exampleDate">From</Label>
          <Input
            id="exampleDate1"
            name="date"
            placeholder="date placeholder"
            type="date"
            value={this.state.inputValue}
            onChange={(e) => this.updateInputValue(e)}
          />
          <Label for="exampleDate">To</Label>
          <Input
            id="exampleDate2"
            name="date"
            placeholder="date placeholder"
            type="date"
            value={this.state.inputToValue}
            onChange={(e) => this.updateInputToValue(e)}
          />
        </FormGroup>
      </Form>
    )
  }
}
export default Data
