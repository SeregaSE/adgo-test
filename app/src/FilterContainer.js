import React from 'react';
import Filter from './Filter';
import axios from 'axios';


class FilterContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        errorMessage: '',
      };
  
    }

    componentDidMount() {
      axios.get(this.props.url).then(res => {
          this.setState({ data: res.data});
      }).catch(err => {
        this.setState({ errorMessage: err});
      });
    }
  
    render(){
      if (this.state.errorMessage !== '') 
        return (
          <div className="alert alert-primary" role="alert">
            { this.state.errorMessage }
          </div>);
      return (
          <Filter data={this.state.data} label={this.props.label} handleChange={this.props.handleChange} name={this.props.name} />
      );
    }
  }
  
  export default FilterContainer;