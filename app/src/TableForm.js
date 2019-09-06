import React from 'react';
import FilterContainer from './FilterContainer';

class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    return (
        <form /*onSubmit={this.handleSubmit}*/ >
            <FilterContainer url="/v1/platforms" label="Platform"/>
        </form>
    );
  }
}

export default TableForm;
