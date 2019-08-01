import React from 'react';
import To from "./To";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {setTo} from "../../../redux/dateReducer";

class ToContainer extends React.Component {
    render() {
        return <To {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        to: state.date.to
    }
};

export default withRouter(connect(mapStateToProps, {setTo})(ToContainer));