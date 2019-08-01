import React from 'react';
import Data from "./Data";
import {connect} from "react-redux";
import {getData} from "../../redux/dataReducer";

class DataContainer extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.from, this.props.to, this.props.group, this.props.platform, [this.props.browser], [this.props.OS], this.props.pageSize, this.props.offset);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.from !== this.props.from
        || prevProps.to !== this.props.to
        || prevProps.group !== this.props.group
        || prevProps.platform !== this.props.platform
        || prevProps.browser !== this.props.browser
        || prevProps.OS !== this.props.OS
        || prevProps.offset !== this.props.offset) {
            this.props.getData(this.props.from, this.props.to, this.props.group, this.props.platform, [this.props.browser], [this.props.OS], this.props.pageSize, this.props.offset);
        }
    }

    render() {
        return <Data {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        data: state.data.data,
        from: state.date.from,
        to: state.date.to,
        group: state.groups.currentGroup,
        platform: state.platforms.currentPlatform,
        browser: state.browsers.currentBrowser,
        OS: state.operatingSystems.currentSystem,
        pageSize: state.data.pageSize,
        offset: state.data.offset
    }
};

export default connect(mapStateToProps, {getData})(DataContainer);