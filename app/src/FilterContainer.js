import React from 'react';
import Filter from './Filter';
import axios from 'axios';


class FilterContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
  
    }

    componentDidMount() {
      axios.get(this.props.url).then(res => {
          this.setState({ data: res.data});
      }).catch(err => {
        this.props.handleError(err);
      });
    }
  
    render(){
      const {isMultiple, label, handleChange, name} = this.props;
      const data = this.state.data;

      return (
          <Filter data={data} 
                  isMultiple={isMultiple} 
                  label={label} 
                  handleChange={handleChange} 
                  name={name} />
      );
    }
  }
  
  export default FilterContainer;