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
      const {isMultiple, label, handleChange, name} = this.props;
      const {errorMessage, data} = this.state;
      if (errorMessage !== '') 
        return (
          <div className="alert alert-primary" role="alert">
            { errorMessage }
          </div>);
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