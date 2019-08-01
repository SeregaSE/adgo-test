import React from 'react';
import Platform from "./Platform";
import {connect} from "react-redux";
import {getPlatforms, setCurrentPlatform} from "../../../redux/platformsReducer";
import {setCurrentSystem} from "../../../redux/OSReducer";
import {setCurrentBrowser} from "../../../redux/browsersReducer";

class PlatformContainer extends React.Component {
    componentDidMount() {
        this.props.getPlatforms();
    }

    render() {
        return <Platform {...this.props} />;
    }
}

let mapStateToProps = state => {
    return {
        platforms: state.platforms.platforms,
        currentPlatform: state.platforms.currentPlatform,
        systems: state.operatingSystems.OSs,
        browsers: state.browsers.browsers
    }
};

export default connect(mapStateToProps, {
    getPlatforms,
    setCurrentPlatform,
    setCurrentSystem,
    setCurrentBrowser
})(PlatformContainer);