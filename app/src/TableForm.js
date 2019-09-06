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
            <FilterContainer url="/v1/groups" label="Groups"/>
            <FilterContainer url="/v1/platforms" label="Platform"/>
            <FilterContainer url="/v1/operating-systems" label="Operating systems"/>
            <FilterContainer url="/v1/browsers" label="Browsers"/>
        </form>
    );
  }
}

export default TableForm;
