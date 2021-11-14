import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
class Data extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleDate">From</Label>
          <Input
            id="exampleDate1"
            name="date"
            placeholder="date placeholder"
            type="date"
          />
          <Label for="exampleDate">To</Label>
          <Input
            id="exampleDate2"
            name="date"
            placeholder="date placeholder"
            type="date"
          />
        </FormGroup>
      </Form>
    )
  }
}
export default Data
