import React from 'react';
import Option from "../../DateFilter/GroupBy/Option/Option";
import OS from "./OS";
import {connect} from "react-redux";
import {getOSs, setCurrentSystem, setOSs} from "../../../redux/OSReducer";

class OSContainer extends React.Component {
    componentDidMount() {
        this.props.getOSs();
    }

    render() {
        return <OS {...this.props} />
    }
}

let mapStateToProps = state => {
    return {
        systems: state.operatingSystems.OSs,
        currentPlatform: state.platforms.currentPlatform,
        currentSystem: state.operatingSystems.currentSystem
    }
};

export default connect(mapStateToProps, {getOSs, setCurrentSystem})(OSContainer);