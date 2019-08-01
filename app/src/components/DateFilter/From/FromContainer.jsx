import React from 'react';
import From from "./From";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setFrom} from "../../../redux/dateReducer";

class FromContainer extends React.Component {
    render() {
        return <From {...this.props} onBlur={this.onBlur} />
    }
}

const mapStateToProps = state => {
    return {
        from: state.date.from
    }
};

export default withRouter(connect(mapStateToProps, {setFrom})(FromContainer));