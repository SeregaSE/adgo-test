import React from 'react';
import Browser from "./Browser";
import {connect} from "react-redux";
import {getBrowsers, setCurrentBrowser} from "../../../redux/browsersReducer";

class BrowserContainer extends React.Component {
    componentDidMount() {
        this.props.getBrowsers();
    }

    render() {
        return <Browser {...this.props} />
    }
}

let mapStateToProps = state => {
    return {
        browsers: state.browsers.browsers,
        currentBrowser: state.browsers.currentBrowser,
        currentPlatform: state.platforms.currentPlatform
    }
};

export default connect(mapStateToProps, {getBrowsers, setCurrentBrowser})(BrowserContainer);