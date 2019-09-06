import React from 'react';
import Filter from './Filter';
import axios from 'axios';


class FilterContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {data: []};
  
    }
    componentDidMount() {
        axios.get(this.props.url).then(res => {
            this.setState({ data: res.data});
        }).catch(err => {
            throw new Error(err)
          });
    }
  
    render(){
      if (this.state.data === []) return (null);
      return (
          <Filter data={this.state.data} label={this.props.label} />
      );
    }
  }
  
  export default FilterContainer;